import React, { useState, useEffect } from 'react';
import { Card, Button, Input } from './ui';
import { Icons } from './Icons';
import { useAuth } from '../src/contexts/AuthContext';

type SettingsTab = 'security' | 'audit' | 'institution' | 'profile';

interface AuditLogEntry {
  id: string;
  action: string;
  timestamp: string;
  user_name: string;
  user_email: string;
  manuscript_title?: string;
  manuscript_id?: string;
  metadata: any;
}

export const Settings: React.FC = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<SettingsTab>('security');
  const [auditLogs, setAuditLogs] = useState<AuditLogEntry[]>([]);
  const [auditStats, setAuditStats] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  // Settings state
  const [digitalSignatureEnabled, setDigitalSignatureEnabled] = useState(false);
  const [institutionName, setInstitutionName] = useState('');
  const [institutionCIF, setInstitutionCIF] = useState('');
  const [archiver, setArchiver] = useState('');
  const [retentionPolicy, setRetentionPolicy] = useState('30');

  // Load audit logs
  useEffect(() => {
    if (activeTab === 'audit') {
      loadAuditLogs();
      loadAuditStats();
    }
  }, [activeTab]);

  const loadAuditLogs = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/audit/logs?limit=50', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      const data = await response.json();
      if (data.success) {
        setAuditLogs(data.logs);
      }
    } catch (error) {
      console.error('Error loading audit logs:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadAuditStats = async () => {
    try {
      const response = await fetch('/api/audit/statistics', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      const data = await response.json();
      if (data.success) {
        setAuditStats(data.statistics);
      }
    } catch (error) {
      console.error('Error loading audit stats:', error);
    }
  };

  const getActionIcon = (action: string) => {
    if (action.includes('UPLOAD')) return '📤';
    if (action.includes('EDIT')) return '✏️';
    if (action.includes('DELETE')) return '🗑️';
    if (action.includes('TRANSLATION')) return '🌍';
    if (action.includes('ANALYSIS')) return '🤖';
    if (action.includes('LOGIN')) return '🔑';
    if (action.includes('EXPORT')) return '📥';
    return '📄';
  };

  const formatActionName = (action: string) => {
    return action
      .toLowerCase()
      .replace(/_/g, ' ')
      .replace(/\b\w/g, l => l.toUpperCase());
  };

  const tabButtonClass = (isActive: boolean) => `
    px-6 py-3 font-display text-sm tracking-wide transition-all duration-200 border-b-2
    ${isActive
      ? 'border-copper-500 text-copper-600 bg-copper-50'
      : 'border-transparent text-wood-800 hover:text-copper-600 hover:border-copper-300'}
  `;

  return (
    <div className="animate-fade-in max-w-6xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <h1 className="font-display font-bold text-3xl text-wood-900 mb-2 flex items-center gap-3">
          <Icons.Settings className="w-8 h-8 text-copper-500" />
          Configuración y Seguridad
        </h1>
        <p className="font-serif text-wood-800/70">
          Gestiona la configuración de tu cuenta y las preferencias de seguridad
        </p>
      </div>

      {/* Tabs */}
      <div className="bg-parchment-100 border border-wood-800/20 rounded-t-lg overflow-hidden shadow-lg">
        <div className="flex border-b border-wood-800/20">
          <button
            onClick={() => setActiveTab('security')}
            className={tabButtonClass(activeTab === 'security')}
          >
            🔐 Seguridad
          </button>
          <button
            onClick={() => setActiveTab('audit')}
            className={tabButtonClass(activeTab === 'audit')}
          >
            📊 Auditoría
          </button>
          <button
            onClick={() => setActiveTab('institution')}
            className={tabButtonClass(activeTab === 'institution')}
          >
            🏛️ Institución
          </button>
          <button
            onClick={() => setActiveTab('profile')}
            className={tabButtonClass(activeTab === 'profile')}
          >
            👤 Perfil
          </button>
        </div>

        <div className="p-8">
          {/* SECURITY TAB */}
          {activeTab === 'security' && (
            <div className="space-y-6">
              <Card title="🔐 Certificación Digital (Opcional)">
                <div className="space-y-4">
                  <div className="bg-yellow-50 border border-yellow-200 rounded-sm p-4">
                    <p className="text-sm text-yellow-900 font-serif">
                      ⚠️ <strong>Servicio exclusivo para instituciones:</strong> La firma digital criptográfica
                      garantiza la autenticidad y detecta modificaciones no autorizadas en los documentos.
                    </p>
                  </div>

                  <div className="flex items-start gap-3">
                    <input
                      type="checkbox"
                      id="digitalSignature"
                      checked={digitalSignatureEnabled}
                      onChange={(e) => setDigitalSignatureEnabled(e.target.checked)}
                      className="mt-1 w-5 h-5 text-copper-600 border-wood-800/30 rounded focus:ring-copper-500"
                    />
                    <label htmlFor="digitalSignature" className="flex-1 cursor-pointer">
                      <span className="font-display font-bold text-wood-900">
                        Habilitar firma digital criptográfica para documentos
                      </span>
                    </label>
                  </div>

                  {digitalSignatureEnabled && (
                    <div className="ml-8 p-4 bg-green-50 border border-green-200 rounded-sm">
                      <p className="font-display font-bold text-green-900 mb-2">📄 Beneficios:</p>
                      <ul className="text-sm text-green-900 font-serif space-y-1 list-disc list-inside">
                        <li>Garantiza autenticidad del documento</li>
                        <li>Detecta modificaciones no autorizadas</li>
                        <li>Validez legal y probatoria</li>
                        <li>Certificado con timestamp</li>
                      </ul>
                    </div>
                  )}

                  <div className="flex items-center gap-2 text-sm font-serif">
                    <span className="font-bold">Estado:</span>
                    {digitalSignatureEnabled ? (
                      <span className="text-green-600">✅ Activado</span>
                    ) : (
                      <span className="text-red-600">❌ Desactivado</span>
                    )}
                  </div>

                  <div className="flex gap-3">
                    <Button variant="primary">
                      {digitalSignatureEnabled ? 'Guardar Configuración' : 'Activar Certificación'}
                    </Button>
                    <Button variant="ghost">
                      ? Más información
                    </Button>
                  </div>
                </div>
              </Card>

              <Card title="🗂️ Almacenamiento de Documentos">
                <div className="space-y-4">
                  <div className="text-sm font-serif text-wood-800 space-y-2">
                    <p>• <strong>Ubicación:</strong> Almacenamiento temporal cifrado</p>
                    <p>• <strong>Retención:</strong> Configurable por institución</p>
                    <p>• <strong>Backup automático:</strong> Cada 24 horas</p>
                  </div>

                  <div>
                    <label className="block font-display font-bold text-wood-900 mb-3">
                      Política de retención de imágenes:
                    </label>
                    <div className="space-y-2">
                      {[
                        { value: '0', label: 'Eliminar inmediatamente tras procesamiento' },
                        { value: '30', label: 'Conservar 30 días' },
                        { value: '90', label: 'Conservar 90 días' },
                        { value: '-1', label: 'Conservar indefinidamente' }
                      ].map(option => (
                        <label key={option.value} className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="radio"
                            name="retention"
                            value={option.value}
                            checked={retentionPolicy === option.value}
                            onChange={(e) => setRetentionPolicy(e.target.value)}
                            className="w-4 h-4 text-copper-600 border-wood-800/30 focus:ring-copper-500"
                          />
                          <span className="font-serif text-wood-900">{option.label}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4">
                    <p className="font-display font-bold text-wood-900 mb-2">📊 Espacio utilizado</p>
                    <div className="flex items-center gap-3 mb-2">
                      <div className="flex-1 h-4 bg-wood-800/10 rounded-full overflow-hidden">
                        <div className="h-full bg-copper-500" style={{ width: '23%' }}></div>
                      </div>
                      <span className="font-serif text-sm text-wood-800">23%</span>
                    </div>
                    <p className="text-sm font-serif text-wood-800/70">2.3 GB / 10 GB</p>
                  </div>

                  <Button variant="primary">Guardar Cambios</Button>
                </div>
              </Card>
            </div>
          )}

          {/* AUDIT TAB */}
          {activeTab === 'audit' && (
            <div className="space-y-6">
              <Card title="📈 Registro de Actividad">
                <div className="space-y-4">
                  <div className="flex gap-4 mb-4">
                    <select className="px-3 py-2 border border-wood-800/30 rounded-sm font-serif text-wood-900 bg-parchment-100">
                      <option>Últimos 7 días</option>
                      <option>Últimos 30 días</option>
                      <option>Últimos 90 días</option>
                      <option>Todo el tiempo</option>
                    </select>
                    <select className="px-3 py-2 border border-wood-800/30 rounded-sm font-serif text-wood-900 bg-parchment-100">
                      <option>Todos los usuarios</option>
                      <option>Solo mis acciones</option>
                    </select>
                  </div>

                  {loading ? (
                    <div className="text-center py-8">
                      <p className="font-serif text-wood-800/70">Cargando registros...</p>
                    </div>
                  ) : auditLogs.length === 0 ? (
                    <div className="text-center py-8">
                      <p className="font-serif text-wood-800/70">No hay registros de auditoría disponibles</p>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {auditLogs.slice(0, 10).map((log) => (
                        <div key={log.id} className="border border-wood-800/20 rounded-sm p-4 hover:bg-parchment-200/50 transition-colors">
                          <div className="flex items-start justify-between gap-4">
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <span className="text-lg">{getActionIcon(log.action)}</span>
                                <span className="font-display font-bold text-wood-900">
                                  {formatActionName(log.action)}
                                </span>
                              </div>
                              <p className="text-sm font-serif text-wood-800/70">
                                📅 {new Date(log.timestamp).toLocaleString('es-ES')} | 👤 {log.user_name || log.user_email}
                              </p>
                              {log.manuscript_title && (
                                <p className="text-sm font-serif text-wood-800 mt-1">
                                  📄 {log.manuscript_title}
                                </p>
                              )}
                            </div>
                            <div className="flex gap-2">
                              <Button variant="ghost" className="text-xs">Ver detalles</Button>
                              {log.manuscript_id && (
                                <Button variant="ghost" className="text-xs">Ver documento</Button>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  <div className="flex gap-3 pt-4">
                    <Button variant="secondary">📊 Exportar Registro CSV</Button>
                    <Button variant="secondary">📄 Generar Informe</Button>
                  </div>
                </div>
              </Card>

              {auditStats && (
                <Card title="📊 Estadísticas de Uso">
                  <div className="space-y-4">
                    <p className="font-display font-bold text-wood-900">Esta semana:</p>
                    <ul className="text-sm font-serif text-wood-800 space-y-2">
                      <li>• <strong>Total de acciones:</strong> {auditStats.total}</li>
                      {auditStats.byAction && auditStats.byAction.slice(0, 5).map((item: any) => (
                        <li key={item.action}>
                          • <strong>{formatActionName(item.action)}:</strong> {item.count}
                        </li>
                      ))}
                    </ul>
                    <Button variant="ghost">Ver gráficas detalladas</Button>
                  </div>
                </Card>
              )}
            </div>
          )}

          {/* INSTITUTION TAB */}
          {activeTab === 'institution' && (
            <div className="space-y-6">
              <Card title="🏛️ Información Institucional">
                <div className="space-y-4">
                  <div>
                    <label className="block font-display font-bold text-wood-900 mb-2">
                      Nombre de la institución:
                    </label>
                    <Input
                      type="text"
                      value={institutionName}
                      onChange={(e) => setInstitutionName(e.target.value)}
                      placeholder="Ej: Archivo Histórico Provincial"
                    />
                  </div>

                  <div>
                    <label className="block font-display font-bold text-wood-900 mb-2">
                      CIF/NIF:
                    </label>
                    <Input
                      type="text"
                      value={institutionCIF}
                      onChange={(e) => setInstitutionCIF(e.target.value)}
                      placeholder="Ej: A12345678"
                    />
                  </div>

                  <div>
                    <label className="block font-display font-bold text-wood-900 mb-2">
                      Archivero/Responsable:
                    </label>
                    <Input
                      type="text"
                      value={archiver}
                      onChange={(e) => setArchiver(e.target.value)}
                      placeholder="Nombre del responsable"
                    />
                  </div>

                  <Button variant="primary">Guardar Información</Button>
                </div>
              </Card>
            </div>
          )}

          {/* PROFILE TAB */}
          {activeTab === 'profile' && (
            <div className="space-y-6">
              <Card title="👤 Información del Usuario">
                <div className="space-y-4">
                  <div>
                    <label className="block font-display font-bold text-wood-900 mb-2">Nombre:</label>
                    <Input type="text" value={user?.name || ''} disabled />
                  </div>

                  <div>
                    <label className="block font-display font-bold text-wood-900 mb-2">Email:</label>
                    <Input type="email" value={user?.email || ''} disabled />
                  </div>

                  <div>
                    <label className="block font-display font-bold text-wood-900 mb-2">Rol:</label>
                    <Input type="text" value={user?.role || ''} disabled />
                  </div>

                  <div className="pt-4 border-t border-wood-800/20">
                    <Button variant="secondary">Cambiar Contraseña</Button>
                  </div>
                </div>
              </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
