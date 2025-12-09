import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { SearchBar } from '../../components/SearchBar';

// Mock del servicio de API
vi.mock('../../src/services/apiService', () => ({
  manuscriptService: {
    search: vi.fn(),
  },
}));

import { manuscriptService } from '../../src/services/apiService';

describe('SearchBar Component', () => {
  const mockOnSelectManuscript = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('debe renderizar correctamente', () => {
    render(<SearchBar onSelectManuscript={mockOnSelectManuscript} />);

    expect(screen.getByPlaceholderText(/buscar manuscritos/i)).toBeInTheDocument();
  });

  it('no debe buscar con menos de 3 caracteres', async () => {
    const user = userEvent.setup();
    render(<SearchBar onSelectManuscript={mockOnSelectManuscript} />);

    const input = screen.getByPlaceholderText(/buscar manuscritos/i);
    await user.type(input, 'ab');

    await waitFor(() => {
      expect(manuscriptService.search).not.toHaveBeenCalled();
    });
  });

  it('debe buscar después de escribir 3+ caracteres con debounce', async () => {
    const user = userEvent.setup();
    const mockResults = [
      {
        id: '1',
        title: 'Carta Real',
        transcription: 'Texto de prueba',
        imageUrl: '/test.jpg',
        createdAt: '2025-01-01',
        rank: 0.95,
      },
    ];

    vi.mocked(manuscriptService.search).mockResolvedValue({
      success: true,
      results: mockResults,
      count: 1,
      query: 'carta',
    });

    render(<SearchBar onSelectManuscript={mockOnSelectManuscript} />);

    const input = screen.getByPlaceholderText(/buscar manuscritos/i);
    await user.type(input, 'carta');

    // Esperar el debounce (500ms)
    await waitFor(
      () => {
        expect(manuscriptService.search).toHaveBeenCalledWith('carta', 10);
      },
      { timeout: 1000 }
    );
  });

  it('debe mostrar resultados después de buscar', async () => {
    const user = userEvent.setup();
    const mockResults = [
      {
        id: '1',
        title: 'Carta Real del Siglo XVI',
        transcription: 'Don Felipe por la gracia de Dios...',
        imageUrl: '/test.jpg',
        createdAt: '2025-01-01',
        rank: 0.95,
      },
    ];

    vi.mocked(manuscriptService.search).mockResolvedValue({
      success: true,
      results: mockResults,
      count: 1,
      query: 'carta',
    });

    render(<SearchBar onSelectManuscript={mockOnSelectManuscript} />);

    const input = screen.getByPlaceholderText(/buscar manuscritos/i);
    await user.type(input, 'carta real');

    await waitFor(() => {
      expect(screen.getByText(/Carta Real del Siglo XVI/i)).toBeInTheDocument();
    }, { timeout: 1000 });
  });

  it('debe llamar onSelectManuscript al hacer clic en resultado', async () => {
    const user = userEvent.setup();
    const mockResults = [
      {
        id: '1',
        title: 'Carta Real',
        transcription: 'Texto',
        imageUrl: '/test.jpg',
        createdAt: '2025-01-01',
        rank: 0.95,
      },
    ];

    vi.mocked(manuscriptService.search).mockResolvedValue({
      success: true,
      results: mockResults,
      count: 1,
      query: 'carta',
    });

    render(<SearchBar onSelectManuscript={mockOnSelectManuscript} />);

    const input = screen.getByPlaceholderText(/buscar manuscritos/i);
    await user.type(input, 'carta');

    await waitFor(() => {
      expect(screen.getByText(/Carta Real/i)).toBeInTheDocument();
    }, { timeout: 1000 });

    const result = screen.getByText(/Carta Real/i);
    await user.click(result);

    expect(mockOnSelectManuscript).toHaveBeenCalledWith(mockResults[0]);
  });

  it('debe mostrar mensaje cuando no hay resultados', async () => {
    const user = userEvent.setup();

    vi.mocked(manuscriptService.search).mockResolvedValue({
      success: true,
      results: [],
      count: 0,
      query: 'xyz123',
    });

    render(<SearchBar onSelectManuscript={mockOnSelectManuscript} />);

    const input = screen.getByPlaceholderText(/buscar manuscritos/i);
    await user.type(input, 'xyz123');

    await waitFor(() => {
      expect(screen.getByText(/no se encontraron manuscritos/i)).toBeInTheDocument();
    }, { timeout: 1000 });
  });

  it('debe manejar errores de búsqueda gracefully', async () => {
    const user = userEvent.setup();

    vi.mocked(manuscriptService.search).mockRejectedValue(new Error('Network error'));

    render(<SearchBar onSelectManuscript={mockOnSelectManuscript} />);

    const input = screen.getByPlaceholderText(/buscar manuscritos/i);
    await user.type(input, 'test error');

    // No debería crashear la aplicación
    await waitFor(() => {
      expect(input).toBeInTheDocument();
    }, { timeout: 1000 });
  });

  it('debe limpiar resultados al borrar búsqueda', async () => {
    const user = userEvent.setup();
    const mockResults = [
      {
        id: '1',
        title: 'Carta Real',
        transcription: 'Texto',
        imageUrl: '/test.jpg',
        createdAt: '2025-01-01',
        rank: 0.95,
      },
    ];

    vi.mocked(manuscriptService.search).mockResolvedValue({
      success: true,
      results: mockResults,
      count: 1,
      query: 'carta',
    });

    render(<SearchBar onSelectManuscript={mockOnSelectManuscript} />);

    const input = screen.getByPlaceholderText(/buscar manuscritos/i);
    await user.type(input, 'carta');

    await waitFor(() => {
      expect(screen.getByText(/Carta Real/i)).toBeInTheDocument();
    }, { timeout: 1000 });

    await user.clear(input);

    await waitFor(() => {
      expect(screen.queryByText(/Carta Real/i)).not.toBeInTheDocument();
    });
  });
});
