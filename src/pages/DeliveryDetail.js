import React from 'react';
import { ArrowLeftIcon } from '../assets/icons';

function DeliveryDetail({ delivery, onBack, isFromArchive }) { 
    if (!delivery) {
        return (
            <div className="empty-state">
                <h3>Detalhes da entrega não encontrados.</h3>
                <button onClick={onBack} className="btn-secondary">Voltar</button>
            </div>
        );
    }

    const formatDateTime = (isoString) => {
        return isoString ? new Date(isoString).toLocaleString('pt-BR') : 'N/A';
    };

    return (
        <div className="delivery-detail-container">
            <header className="list-header" style={{ justifyContent: 'center' }}>
                <button onClick={onBack} className="back-button" style={{ position: 'absolute', left: '1.5rem' }}><ArrowLeftIcon /></button>
                <h1>Detalhes da Entrega</h1>
            </header>
            <div className="detail-card">
                <h3>Informações do Pedido</h3>
                <p><strong>Cliente:</strong> {delivery.clientName}</p>
                <p><strong>Status:</strong> <span className={`status-badge status-${delivery.status.toLowerCase()}`}>{delivery.status}</span></p>
                <p><strong>Item:</strong> {delivery.itemType}</p>
                <p><strong>Quantidade:</strong> {delivery.itemQuantity}</p>
                <p><strong>Entregador:</strong> {delivery.driver}</p>
                <p><strong>Veículo:</strong> {delivery.vehicle}</p>
                
                {isFromArchive && (
                    <>
                        <hr />
                        <h3>Datas e Horários</h3>
                        <p><strong>Criado em:</strong> {formatDateTime(delivery.createdAt)}</p>
                        <p><strong>Início da Rota:</strong> {formatDateTime(delivery.startTime)}</p>
                        <p><strong>Fim da Rota:</strong> {formatDateTime(delivery.endTime)}</p>
                        <p><strong>Tempo Total de Rota:</strong> {delivery.totalTime || 'N/A'}</p>
                    </>
                )}

                {delivery.observation && (
                    <>
                        <hr />
                        <h3>Observação</h3>
                        <p className="observation-full">{delivery.observation}</p>
                    </>
                )}

                <div className="form-actions" style={{ justifyContent: 'center', marginTop: '2rem' }}>
                    <button onClick={onBack} className="btn-secondary">Voltar</button>
                </div>
            </div>
            <style>{`
                .delivery-detail-container {
                    max-width: 600px;
                    margin: 0 auto;
                    padding: 1.5rem;
                }
                .detail-card {
                    background-color: var(--color-surface);
                    padding: 2rem;
                    border-radius: 0.5rem;
                    box-shadow: 0 4px 12px rgb(0 0 0 / 0.1);
                    margin-top: 1.5rem;
                }
                .detail-card h3 {
                    margin-top: 0;
                    margin-bottom: 1.5rem;
                    color: var(--color-text);
                }
                .detail-card p {
                    margin-bottom: 0.75rem;
                    line-height: 1.5;
                }
                .detail-card p strong {
                    color: var(--color-text-light);
                    margin-right: 0.5rem;
                }
                .detail-card hr {
                    border: 0;
                    border-top: 1px solid var(--color-border);
                    margin: 1.5rem 0;
                }
                .detail-card .status-badge {
                    display: inline-block;
                    margin-left: 0.5rem;
                }

                .observation-full {
                    white-space: pre-wrap;
                    word-wrap: break-word;
                    overflow-wrap: break-word;
                }
                .list-header {
                    position: relative;
                }
            `}</style>
        </div>
    );
}

export default DeliveryDetail;