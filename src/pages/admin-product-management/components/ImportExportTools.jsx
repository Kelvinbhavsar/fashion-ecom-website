import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';


const ImportExportTools = ({ 
  onImport, 
  onExport, 
  totalProducts 
}) => {
  const [isImporting, setIsImporting] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [importFile, setImportFile] = useState(null);
  const [dragActive, setDragActive] = useState(false);

  const handleImport = async () => {
    if (!importFile) return;

    setIsImporting(true);
    try {
      // Simulate file processing
      const formData = new FormData();
      formData?.append('file', importFile);
      
      // Mock import process
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      if (onImport) {
        onImport(formData);
      }
      
      setImportFile(null);
    } catch (error) {
      console.error('Import failed:', error);
    } finally {
      setIsImporting(false);
    }
  };

  const handleExport = async (format = 'csv') => {
    setIsExporting(true);
    try {
      // Simulate export process
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      if (onExport) {
        onExport(format);
      }
      
      // Create mock download
      const mockData = `Product Name,Category,Price,Stock,Status\nDivine Krishna Bag,bags,299,50,active\nSacred Cloth,clothes,199,30,active`;
      const blob = new Blob([mockData], { type: 'text/csv' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `krishna-products-${new Date()?.toISOString()?.split('T')?.[0]}.${format}`;
      document.body?.appendChild(a);
      a?.click();
      document.body?.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Export failed:', error);
    } finally {
      setIsExporting(false);
    }
  };

  const handleDrag = (e) => {
    e?.preventDefault();
    e?.stopPropagation();
    if (e?.type === "dragenter" || e?.type === "dragover") {
      setDragActive(true);
    } else if (e?.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e?.preventDefault();
    e?.stopPropagation();
    setDragActive(false);
    
    if (e?.dataTransfer?.files && e?.dataTransfer?.files?.[0]) {
      const file = e?.dataTransfer?.files?.[0];
      if (file?.type === 'text/csv' || file?.name?.endsWith('.csv')) {
        setImportFile(file);
      }
    }
  };

  const handleFileSelect = (e) => {
    const file = e?.target?.files?.[0];
    if (file && (file?.type === 'text/csv' || file?.name?.endsWith('.csv'))) {
      setImportFile(file);
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center space-x-3">
        <Icon name="ArrowUpDown" size={24} className="text-primary" />
        <div>
          <h3 className="text-lg font-semibold text-foreground">Import & Export Tools</h3>
          <p className="text-sm text-muted-foreground">
            Bulk manage your product catalog with CSV files
          </p>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Import Section */}
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <Icon name="Upload" size={20} className="text-success" />
            <h4 className="font-semibold text-foreground">Import Products</h4>
          </div>

          {/* File Drop Zone */}
          <div
            className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
              dragActive 
                ? 'border-primary bg-primary/5' :'border-border hover:border-primary/50'
            }`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <Icon name="FileText" size={32} className="mx-auto text-muted-foreground mb-2" />
            <p className="text-sm text-muted-foreground mb-2">
              Drag & drop your CSV file here, or click to select
            </p>
            <input
              type="file"
              accept=".csv"
              onChange={handleFileSelect}
              className="hidden"
              id="csv-upload"
            />
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => document.getElementById('csv-upload')?.click()}
            >
              Select CSV File
            </Button>
          </div>

          {/* Selected File */}
          {importFile && (
            <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
              <div className="flex items-center space-x-2">
                <Icon name="FileText" size={16} className="text-success" />
                <span className="text-sm font-medium text-foreground">
                  {importFile?.name}
                </span>
                <span className="text-xs text-muted-foreground">
                  ({(importFile?.size / 1024)?.toFixed(1)} KB)
                </span>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setImportFile(null)}
              >
                <Icon name="X" size={14} />
              </Button>
            </div>
          )}

          {/* Import Actions */}
          <div className="space-y-2">
            <Button
              variant="success"
              fullWidth
              onClick={handleImport}
              disabled={!importFile || isImporting}
              loading={isImporting}
              iconName="Upload"
              iconPosition="left"
            >
              {isImporting ? 'Importing Products...' : 'Import Products'}
            </Button>
            
            <Button
              variant="outline"
              size="sm"
              fullWidth
              onClick={() => handleExport('csv')}
            >
              <Icon name="Download" size={14} className="mr-2" />
              Download Sample CSV
            </Button>
          </div>

          {/* Import Guidelines */}
          <div className="text-xs text-muted-foreground space-y-1">
            <p className="font-medium">CSV Format Requirements:</p>
            <ul className="list-disc list-inside space-y-1 ml-2">
              <li>Headers: Name, Category, Price, Stock, Status</li>
              <li>Categories: bags, clothes, scrunchies, jewelry, books</li>
              <li>Status: active, inactive, out_of_stock</li>
              <li>Price in INR (numbers only)</li>
            </ul>
          </div>
        </div>

        {/* Export Section */}
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <Icon name="Download" size={20} className="text-primary" />
            <h4 className="font-semibold text-foreground">Export Products</h4>
          </div>

          {/* Export Stats */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-muted/50 rounded-lg p-3 text-center">
              <div className="text-2xl font-bold text-primary">{totalProducts}</div>
              <div className="text-xs text-muted-foreground">Total Products</div>
            </div>
            <div className="bg-muted/50 rounded-lg p-3 text-center">
              <div className="text-2xl font-bold text-success">
                {Math.floor(totalProducts * 0.85)}
              </div>
              <div className="text-xs text-muted-foreground">Active Products</div>
            </div>
          </div>

          {/* Export Options */}
          <div className="space-y-2">
            <Button
              variant="default"
              fullWidth
              onClick={() => handleExport('csv')}
              disabled={isExporting}
              loading={isExporting}
              iconName="FileText"
              iconPosition="left"
            >
              Export as CSV
            </Button>
            
            <Button
              variant="outline"
              fullWidth
              onClick={() => handleExport('xlsx')}
              disabled={isExporting}
              iconName="FileSpreadsheet"
              iconPosition="left"
            >
              Export as Excel
            </Button>
            
            <Button
              variant="outline"
              fullWidth
              onClick={() => handleExport('json')}
              disabled={isExporting}
              iconName="Code"
              iconPosition="left"
            >
              Export as JSON
            </Button>
          </div>

          {/* Export Options */}
          <div className="space-y-2">
            <div className="text-xs font-medium text-foreground">Export Options:</div>
            <div className="space-y-1 text-xs text-muted-foreground">
              <label className="flex items-center space-x-2">
                <input type="checkbox" defaultChecked className="rounded" />
                <span>Include product images</span>
              </label>
              <label className="flex items-center space-x-2">
                <input type="checkbox" defaultChecked className="rounded" />
                <span>Include inventory data</span>
              </label>
              <label className="flex items-center space-x-2">
                <input type="checkbox" className="rounded" />
                <span>Include inactive products</span>
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImportExportTools;