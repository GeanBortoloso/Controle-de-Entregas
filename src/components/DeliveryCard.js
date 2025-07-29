import React from 'react';
import { TruckIcon, UserIcon, CheckIcon, XIcon, TrashIcon } from '../assets/icons'; //

function DeliveryCard({ delivery, onUpdateStatus, onDelete, requestConfirmation, onViewDetails }) {
    const getStatusClass = (status) => {
        switch (status) {
            case 'Em Rota': return 'status-em-rota';
            case 'Pendente': return 'status-pendente';
            case 'Finalizada': return 'status-finalizada';
            case 'Cancelada': return 'status-cancelada';
            default: return 'status-default';
        }
    };

    const truncatedObservation = delivery.observation 
        ? `${delivery.observation.substring(0, 50)}${delivery.observation.length > 50 ? '...' : ''}`
        : '';

    return (
        <div className={`delivery-card ${getStatusClass(delivery.status)}`} onClick={() => onViewDetails(delivery, false)}>
            <div className="card-content">
                <div className="card-info">
                    <p className="client-name">{delivery.clientName}</p>
                    <p className="item-info">Item: {delivery.itemType} (Qtd: {delivery.itemQuantity})</p>
                    <div className="driver-info">
                        <span><UserIcon /> {delivery.driver}</span>
                        <span><TruckIcon /> {delivery.vehicle}</span>
                    </div>
                    {delivery.observation && (
                        <p className="observation-snippet">Obs: {truncatedObservation}</p>
                    )}
                </div>
                <div className="card-actions">
                    <span className={`status-badge ${getStatusClass(delivery.status)}`}>{delivery.status}</span>
                    <div className="action-buttons">
                        {delivery.status === 'Pendente' && (
                            <>
                                <button onClick={(e) => { e.stopPropagation(); onUpdateStatus(delivery.id, 'Em Rota'); }} className="icon-button btn-start-route" title="Iniciar Rota"><TruckIcon /></button> {/* */}
                                <button onClick={(e) => { e.stopPropagation(); requestConfirmation('Tem certeza que deseja cancelar este pedido?', () => onUpdateStatus(delivery.id, 'Cancelada'), 'danger'); }} className="icon-button btn-warning" title="Cancelar Pedido"><XIcon /></button> {/* */}
                            </>
                        )}
                        {delivery.status === 'Em Rota' && (
                            <>
                                <button onClick={(e) => { e.stopPropagation(); requestConfirmation('Tem certeza que deseja finalizar este pedido?', () => onUpdateStatus(delivery.id, 'Finalizada'), 'success'); }} className="icon-button btn-success" title="Marcar como Finalizada"><CheckIcon /></button> {/* */}
                                <button onClick={(e) => { e.stopPropagation(); requestConfirmation('Tem certeza que deseja cancelar este pedido?', () => onUpdateStatus(delivery.id, 'Cancelada'), 'danger'); }} className="icon-button btn-warning" title="Cancelar Pedido"><XIcon /></button> {/* */}
                            </>
                        )}
                        {(delivery.status === 'Finalizada' || delivery.status === 'Cancelada') && onDelete && (
                            <button onClick={(e) => { e.stopPropagation(); requestConfirmation('Tem certeza que deseja remover esta entrega da lista ativa?', () => onDelete(delivery.id), 'danger'); }} className="icon-button btn-danger" title="Remover da Lista"><TrashIcon /></button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DeliveryCard;