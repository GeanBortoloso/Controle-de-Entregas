import React, { useMemo } from 'react';
import { ArrowLeftIcon, ExportIcon, ChartBarIcon, TrashIcon } from '../assets/icons';
import FilterDropdown from '../components/FilterDropdown';

function SecretArchive({ archive, onBack, filterDate, setFilterDate, statusFilters, setStatusFilters, clientNameFilter, setClientNameFilter, onShowReports, onDeleteFromArchive, requestConfirmation, onViewDetails }) {
    const filteredArchive = useMemo(() => {
        return archive.filter(d => {
            const isDateMatch = !filterDate || d.createdAt.split('T')[0] === filterDate;
            const isStatusMatch = statusFilters[d.status];
            const isClientMatch = !clientNameFilter || d.clientName.toLowerCase().includes(clientNameFilter.toLowerCase());
            return isDateMatch && isStatusMatch && isClientMatch;
        });
    }, [archive, filterDate, statusFilters, clientNameFilter]);

    const handleExportCSV = () => {
        if (!filteredArchive.length) {
            alert("Não há dados para exportar com os filtros atuais.");
            return;
        }

        const headers = [
            "Cliente", "Status", "Entregador", "Veículo", "Item", "Quantidade", 
            "Data de Criação", "Início da Rota", "Fim da Rota", "Tempo Total de Rota", "Observação"
        ];

        const escapeCSV = (value) => `"${String(value).replace(/"/g, '""')}"`;

        const csvRows = [
            headers.join(';'),
            ...filteredArchive.map(row => {
                const values = [
                    escapeCSV(row.clientName),
                    escapeCSV(row.status),
                    escapeCSV(row.driver),
                    escapeCSV(row.vehicle),
                    escapeCSV(row.itemType),
                    row.itemQuantity,
                    escapeCSV(new Date(row.createdAt).toLocaleString('pt-BR')),
                    escapeCSV(row.startTime ? new Date(row.startTime).toLocaleString('pt-BR') : 'N/A'),
                    escapeCSV(row.endTime ? new Date(row.endTime).toLocaleString('pt-BR') : 'N/A'),
                    escapeCSV(row.totalTime || 'N/A'),
                    escapeCSV(row.observation || '')
                ];
                return values.join(';');
            })
        ];

        const csvString = "\uFEFF" + csvRows.join('\n');
        const blob = new Blob([csvString], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        const url = URL.createObjectURL(blob);
        link.setAttribute('href', url);
        link.setAttribute('download', 'arquivo_entregas.csv');
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const handleDeleteClick = (id) => {
        requestConfirmation(
            "Tem certeza que deseja apagar esta entrega do arquivo? Esta ação é irreversível.",
            () => onDeleteFromArchive(id),
            'danger'
        );
    };

    return (
        <div>
            <header className="list-header">
                <button onClick={onBack} className="back-button"><ArrowLeftIcon /></button>
                <h1>Arquivo de Entregas</h1>
                <div className="header-controls">
                    <button onClick={handleExportCSV} className="icon-button export-button" title="Exportar para CSV"><ExportIcon /></button>
                    <button onClick={onShowReports} className="icon-button" title="Visualizar Relatórios"><ChartBarIcon /></button>
                </div>
            </header>
            <div className="filters-container">
                 <div className="filter-group">
                    <label>Filtrar por Data</label>
                    <input type="date" value={filterDate} onChange={(e) => setFilterDate(e.target.value)} className="date-filter"/>
                </div>
                 <div className="filter-group">
                    <label>Filtrar por Status</label>
                    <FilterDropdown title="Status" options={{'Pendente': true, 'Em Rota': true, 'Finalizada': true, 'Cancelada': true}} selectedOptions={statusFilters} onSelectionChange={setStatusFilters} />
                </div>
                <div className="filter-group">
                    <label>Filtrar por Cliente</label>
                    <input type="text" value={clientNameFilter} onChange={(e) => setClientNameFilter(e.target.value)} placeholder="Nome do cliente..." className="text-filter" />
                </div>
            </div>
            <div className="deliveries-list">
                {filteredArchive.length > 0 ? filteredArchive.map(d => (
                     <div key={d.id} className={`delivery-card ${d.status.toLowerCase()}`} onClick={() => onViewDetails(d, true)}>
                        <div className="card-content">
                            <div className="card-info">
                                <p className="client-name">{d.clientName}</p>
                                <p className="item-info">Item: {d.itemType} (Qtd: {d.itemQuantity})</p>
                                <p><strong>Entregador:</strong> {d.driver}</p>
                                <p><strong>Veículo:</strong> {d.vehicle}</p>
                                {d.observation && (
                                    <p className="observation-snippet">Obs: {`${d.observation.substring(0, 50)}${d.observation.length > 50 ? '...' : ''}`}</p>
                                )}
                            </div>
                            <div className="card-actions">
                                <span className={`status-badge status-${d.status.toLowerCase()}`}>{d.status}</span>
                                <button 
                                    onClick={(e) => { e.stopPropagation(); handleDeleteClick(d.id); }}
                                    className="icon-button btn-danger"
                                    title="Apagar do Arquivo"
                                    style={{ marginLeft: '10px' }}
                                >
                                    <TrashIcon />
                                </button>
                            </div>
                        </div>
                    </div>
                )) : (
                    <div className="empty-state">
                        <h3>Nenhuma entrega encontrada para os filtros selecionados.</h3>
                    </div>
                )}
            </div>
        </div>
    );
}

export default SecretArchive;