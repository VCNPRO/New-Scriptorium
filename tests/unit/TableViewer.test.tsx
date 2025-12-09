import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { TableViewer } from '../../components/TableViewer';

describe('TableViewer Component', () => {
  const mockTables = [
    {
      title: 'Tabla de Precios',
      headers: ['Producto', 'Cantidad', 'Precio'],
      rows: [
        ['Trigo', '100', '50 reales'],
        ['Cebada', '200', '30 reales'],
      ],
      confidence: 0.95,
    },
    {
      title: 'Lista de Nobles',
      headers: ['Nombre', 'Título'],
      rows: [
        ['Don Juan', 'Conde'],
        ['Doña María', 'Duquesa'],
      ],
      confidence: 0.88,
    },
  ];

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('debe renderizar correctamente con tablas', () => {
    render(<TableViewer tables={mockTables} />);

    expect(screen.getByText(/Tablas Extraídas/i)).toBeInTheDocument();
    expect(screen.getByText(/2/)).toBeInTheDocument(); // Contador
  });

  it('no debe renderizar nada si no hay tablas', () => {
    const { container } = render(<TableViewer tables={[]} />);
    expect(container.firstChild).toBeNull();
  });

  it('debe mostrar información de la tabla colapsada', () => {
    render(<TableViewer tables={mockTables} />);

    expect(screen.getByText('Tabla de Precios')).toBeInTheDocument();
    expect(screen.getByText(/3 columnas × 2 filas/i)).toBeInTheDocument();
    expect(screen.getByText(/Confianza: 95%/i)).toBeInTheDocument();
  });

  it('debe expandir/colapsar tabla al hacer clic', async () => {
    const user = userEvent.setup();
    render(<TableViewer tables={mockTables} />);

    const header = screen.getByText('Tabla de Precios').closest('div')!;

    // Inicialmente colapsada, no debe mostrar contenido
    expect(screen.queryByText('Trigo')).not.toBeInTheDocument();

    // Expandir
    await user.click(header);
    expect(screen.getByText('Trigo')).toBeInTheDocument();
    expect(screen.getByText('100')).toBeInTheDocument();
    expect(screen.getByText('50 reales')).toBeInTheDocument();

    // Colapsar
    await user.click(header);
    expect(screen.queryByText('Trigo')).not.toBeInTheDocument();
  });

  it('debe mostrar todos los headers correctamente', async () => {
    const user = userEvent.setup();
    render(<TableViewer tables={mockTables} />);

    const header = screen.getByText('Tabla de Precios').closest('div')!;
    await user.click(header);

    expect(screen.getByText('Producto')).toBeInTheDocument();
    expect(screen.getByText('Cantidad')).toBeInTheDocument();
    expect(screen.getByText('Precio')).toBeInTheDocument();
  });

  it('debe mostrar todas las filas correctamente', async () => {
    const user = userEvent.setup();
    render(<TableViewer tables={mockTables} />);

    const header = screen.getByText('Tabla de Precios').closest('div')!;
    await user.click(header);

    // Primera fila
    expect(screen.getByText('Trigo')).toBeInTheDocument();
    expect(screen.getByText('100')).toBeInTheDocument();
    expect(screen.getByText('50 reales')).toBeInTheDocument();

    // Segunda fila
    expect(screen.getByText('Cebada')).toBeInTheDocument();
    expect(screen.getByText('200')).toBeInTheDocument();
    expect(screen.getByText('30 reales')).toBeInTheDocument();
  });

  it('debe copiar tabla al portapapeles', async () => {
    const user = userEvent.setup();
    const mockClipboard = vi.fn(() => Promise.resolve());
    navigator.clipboard.writeText = mockClipboard;

    render(<TableViewer tables={mockTables} />);

    const header = screen.getByText('Tabla de Precios').closest('div')!;
    await user.click(header);

    const copyButton = screen.getByText('Copiar').closest('button')!;
    await user.click(copyButton);

    expect(mockClipboard).toHaveBeenCalledWith(
      'Producto\tCantidad\tPrecio\nTrigo\t100\t50 reales\nCebada\t200\t30 reales'
    );
  });

  it('debe exportar tabla a CSV', async () => {
    const user = userEvent.setup();

    // Mock de createElement, createObjectURL, etc.
    const mockClick = vi.fn();
    const mockAppendChild = vi.fn();
    const mockRemoveChild = vi.fn();

    const linkElement = {
      click: mockClick,
      setAttribute: vi.fn(),
      style: {},
    };

    vi.spyOn(document, 'createElement').mockReturnValue(linkElement as any);
    vi.spyOn(document.body, 'appendChild').mockImplementation(mockAppendChild);
    vi.spyOn(document.body, 'removeChild').mockImplementation(mockRemoveChild);
    vi.spyOn(URL, 'createObjectURL').mockReturnValue('blob:test');

    render(<TableViewer tables={mockTables} />);

    const header = screen.getByText('Tabla de Precios').closest('div')!;
    await user.click(header);

    const csvButton = screen.getByText('CSV').closest('button')!;
    await user.click(csvButton);

    expect(mockClick).toHaveBeenCalled();
    expect(mockAppendChild).toHaveBeenCalled();
    expect(mockRemoveChild).toHaveBeenCalled();
  });

  it('debe manejar múltiples tablas independientemente', async () => {
    const user = userEvent.setup();
    render(<TableViewer tables={mockTables} />);

    // Expandir primera tabla
    const header1 = screen.getByText('Tabla de Precios').closest('div')!;
    await user.click(header1);
    expect(screen.getByText('Trigo')).toBeInTheDocument();

    // Expandir segunda tabla
    const header2 = screen.getByText('Lista de Nobles').closest('div')!;
    await user.click(header2);
    expect(screen.getByText('Don Juan')).toBeInTheDocument();

    // Primera tabla todavía visible
    expect(screen.getByText('Trigo')).toBeInTheDocument();
  });

  it('debe mostrar guión para celdas vacías', async () => {
    const user = userEvent.setup();
    const tableWithEmpty = [
      {
        title: 'Tabla con Vacíos',
        headers: ['Col1', 'Col2'],
        rows: [
          ['Valor', ''],
          ['', 'Otro'],
        ],
        confidence: 0.9,
      },
    ];

    render(<TableViewer tables={tableWithEmpty} />);

    const header = screen.getByText('Tabla con Vacíos').closest('div')!;
    await user.click(header);

    // Debe mostrar guiones para celdas vacías
    const cells = screen.getAllByText('-');
    expect(cells.length).toBeGreaterThan(0);
  });
});
