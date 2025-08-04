import React, { useState, useMemo } from 'react';
import { useTable, useSortBy, useFilters, usePagination } from 'react-table';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const DataTable = ({ data }) => {
  const [globalFilter, setGlobalFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  // Filter function for global search
  const globalFilterFunction = useMemo(() => {
    return (rows, ids, query) => {
      return rows?.filter(row => {
        return ids?.some(id => {
          const rowValue = row?.values?.[id];
          return rowValue !== undefined
            ? String(rowValue)?.toLowerCase()?.includes(String(query)?.toLowerCase())
            : false;
        });
      });
    };
  }, []);

  // Filter function for status
  const statusFilterFunction = useMemo(() => {
    return (rows, ids, filterValue) => {
      if (filterValue === 'all') return rows;
      return rows?.filter(row => row?.original?.status === filterValue);
    };
  }, []);

  const getHealthColor = (score) => {
    if (score >= 80) return 'text-success';
    if (score >= 60) return 'text-warning';
    return 'text-error';
  };

  const getHealthBgColor = (score) => {
    if (score >= 80) return 'bg-success/15';
    if (score >= 60) return 'bg-warning/15';
    return 'bg-error/15';
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Active': return 'bg-success/15 text-success border-success/30';
      case 'At Risk': return 'bg-warning/15 text-warning border-warning/30';
      case 'Inactive': return 'bg-error/15 text-error border-error/30';
      default: return 'bg-muted/15 text-muted-foreground border-muted/30';
    }
  };

  const columns = useMemo(() => [
    {
      Header: 'Client',
      accessor: 'name',
      Cell: ({ row }) => (
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full flex items-center justify-center border border-primary/20">
            <span className="text-sm font-bold text-primary">
              {row?.original?.name?.charAt(0)}
            </span>
          </div>
          <div>
            <div className="font-semibold text-foreground hover:text-primary transition-colors">
              {row?.original?.name}
            </div>
            <div className="text-sm text-muted-foreground">{row?.original?.industry}</div>
          </div>
        </div>
      ),
    },
    {
      Header: 'Health Score',
      accessor: 'healthScore',
      Cell: ({ value }) => (
        <div className="flex items-center space-x-2">
          <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 ${getHealthBgColor(value)} ${getHealthColor(value)}`}>
            <span className={`text-sm font-bold ${getHealthColor(value)}`}>
              {value}
            </span>
          </div>
          <div className="flex-1">
            <div className="w-full bg-muted/30 rounded-full h-2">
              <div 
                className={`h-2 rounded-full transition-all duration-500 ${
                  value >= 80 ? 'bg-success' : value >= 60 ? 'bg-warning' : 'bg-error'
                }`}
                style={{ width: `${value}%` }}
              />
            </div>
          </div>
        </div>
      ),
    },
    {
      Header: 'Monthly Revenue',
      accessor: 'monthlyRevenue',
      Cell: ({ value }) => (
        <div className="font-semibold text-foreground">
          {new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
          })?.format(value)}
        </div>
      ),
    },
    {
      Header: 'Last Contact',
      accessor: 'lastContact',
      Cell: ({ value }) => (
        <div className="text-sm text-muted-foreground">
          {new Date(value)?.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
          })}
        </div>
      ),
    },
    {
      Header: 'Status',
      accessor: 'status',
      Cell: ({ value }) => (
        <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(value)}`}>
          <div className={`w-2 h-2 rounded-full mr-2 ${
            value === 'Active' ? 'bg-success' : 
            value === 'At Risk' ? 'bg-warning' : 'bg-error'
          }`} />
          {value}
        </span>
      ),
    },
    
  ], []);

  const filteredData = useMemo(() => {
    let filtered = data || [];
    
    // Apply status filter
    if (statusFilter !== 'all') {
      filtered = filtered?.filter(item => item?.status === statusFilter);
    }
    
    // Apply global filter
    if (globalFilter) {
      filtered = filtered?.filter(item =>
        Object?.values(item)?.some(value =>
          String(value)?.toLowerCase()?.includes(globalFilter?.toLowerCase())
        )
      );
    }
    
    return filtered;
  }, [data, statusFilter, globalFilter]);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize },
  } = useTable(
    {
      columns,
      data: filteredData,
      initialState: { pageIndex: 0, pageSize: 5 },
    },
    useFilters,
    useSortBy,
    usePagination
  );

  const statusOptions = [
    { value: 'all', label: 'All Status' },
    { value: 'Active', label: 'Active' },
    { value: 'At Risk', label: 'At Risk' },
    { value: 'Inactive', label: 'Inactive' }
  ];

  const pageSizeOptions = [
    { value: 5, label: '5 per page' },
    { value: 10, label: '10 per page' },
    { value: 20, label: '20 per page' }
  ];

  return (
    <div className="bg-card rounded-xl border border-border shadow-lg overflow-hidden">
      {/* Enhanced Table Header */}
      <div className="bg-gradient-to-r from-muted/30 to-muted/10 p-6 border-b border-border">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
          <div>
            <h3 className="text-xl font-bold text-foreground mb-1">Client Overview</h3>
            <p className="text-sm text-muted-foreground">
              Manage and monitor client relationships with advanced filtering
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
            <div className="w-full sm:w-72">
              <Input
                placeholder="Search clients, industries, or status..."
                value={globalFilter}
                onChange={(e) => setGlobalFilter(e?.target?.value)}
                iconName="Search"
                className="bg-background/50"
              />
            </div>
            
            <Select
              options={statusOptions}
              value={statusFilter}
              onChange={setStatusFilter}
              placeholder="Filter by status"
              className="w-full sm:w-44"
            />
          </div>
        </div>
      </div>
      {/* Enhanced Table */}
      <div className="overflow-x-auto">
        <table {...getTableProps()} className="w-full">
          <thead className="bg-muted/40">
            {headerGroups?.map(headerGroup => (
              <tr {...headerGroup?.getHeaderGroupProps()}>
                {headerGroup?.headers?.map(column => (
                  <th
                    {...column?.getHeaderProps(column?.getSortByToggleProps())}
                    className="px-6 py-4 text-left text-xs font-bold text-muted-foreground uppercase tracking-wider cursor-pointer hover:bg-muted/60 transition-colors group"
                  >
                    <div className="flex items-center space-x-1">
                      <span>{column?.render('Header')}</span>
                      {column?.canSort && (
                        <Icon
                          name={
                            column?.isSorted
                              ? column?.isSortedDesc
                                ? 'ChevronDown' : 'ChevronUp' : 'ChevronsUpDown'
                          }
                          size={14}
                          className="text-muted-foreground group-hover:text-foreground transition-colors"
                        />
                      )}
                    </div>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()} className="bg-card divide-y divide-border">
            {page?.length === 0 ? (
              <tr>
                <td colSpan={columns?.length} className="px-6 py-12 text-center">
                  <div className="text-muted-foreground">
                    <Icon name="Search" size={48} className="mx-auto mb-4 opacity-50" />
                    <p className="text-lg font-medium mb-1">No clients found</p>
                    <p className="text-sm">Try adjusting your search or filter criteria</p>
                  </div>
                </td>
              </tr>
            ) : (
              page?.map(row => {
                prepareRow(row);
                return (
                  <tr 
                    {...row?.getRowProps()} 
                    className="hover:bg-muted/20 transition-all duration-200 group"
                  >
                    {row?.cells?.map(cell => (
                      <td {...cell?.getCellProps()} className="px-6 py-4 whitespace-nowrap">
                        {cell?.render('Cell')}
                      </td>
                    ))}
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
      {/* Enhanced Pagination */}
      <div className="bg-muted/20 px-6 py-4 border-t border-border">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
          <div className="flex items-center space-x-4">
            <Select
              options={pageSizeOptions}
              value={pageSize}
              onChange={(value) => setPageSize(Number(value))}
              className="w-36"
            />
            <span className="text-sm text-muted-foreground">
              Showing {pageIndex * pageSize + 1} to {Math.min((pageIndex + 1) * pageSize, filteredData?.length)} of {filteredData?.length} results
            </span>
          </div>
          
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => gotoPage(0)}
              disabled={!canPreviousPage}
              className="hidden sm:flex"
            >
              First
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={previousPage}
              disabled={!canPreviousPage}
              iconName="ChevronLeft"
            />
            <div className="flex items-center space-x-1">
              <span className="px-3 py-2 text-sm font-medium text-foreground bg-primary/10 rounded-md border border-primary/20">
                {pageIndex + 1}
              </span>
              <span className="text-sm text-muted-foreground">of {pageOptions?.length}</span>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={nextPage}
              disabled={!canNextPage}
              iconName="ChevronRight"
            />
            <Button
              variant="outline"
              size="sm"
              onClick={() => gotoPage(pageCount - 1)}
              disabled={!canNextPage}
              className="hidden sm:flex"
            >
              Last
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataTable;