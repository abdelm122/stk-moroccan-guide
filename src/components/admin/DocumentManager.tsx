
import React, { useState, useEffect } from 'react';
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Separator } from "@/components/ui/separator";
import { Download, File, Trash } from "lucide-react";
import { Database } from "@/integrations/supabase/types";

// Define a type that matches the documents table structure using the generated types
type DocumentRow = Database['public']['Tables']['documents']['Row'];
type DocumentInsert = Database['public']['Tables']['documents']['Insert'];

export function DocumentManager() {
  const [documents, setDocuments] = useState<DocumentRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [documentName, setDocumentName] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  useEffect(() => {
    fetchDocuments();
  }, []);

  const fetchDocuments = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('documents')
        .select('*')
        .order('created_at', { ascending: false });
        
      if (error) throw error;
      
      setDocuments(data || []);
    } catch (error) {
      console.error("Error fetching documents:", error);
      toast.error("Failed to load documents");
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedFile(e.target.files[0]);
      if (!documentName) {
        // Use filename as the document name if not set
        setDocumentName(e.target.files[0].name.split('.')[0]);
      }
    }
  };

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedFile || !documentName.trim()) {
      toast.error("Please select a file and provide a name");
      return;
    }
    
    try {
      setUploading(true);
      
      // Create a unique file path
      const fileExt = selectedFile.name.split('.').pop();
      const filePath = `${Date.now()}_${documentName.replace(/\s+/g, '_')}.${fileExt}`;
      
      // Upload the file to Supabase Storage
      const { data: fileData, error: uploadError } = await supabase.storage
        .from('documents')
        .upload(filePath, selectedFile);
        
      if (uploadError) throw uploadError;
      
      // Get the public URL of the uploaded file
      const { data: publicUrlData } = supabase.storage
        .from('documents')
        .getPublicUrl(filePath);
      
      const publicUrl = publicUrlData.publicUrl;
      
      // Add record to the documents table
      // Create a document object that matches the DocumentInsert type
      const documentToInsert: DocumentInsert = {
        name: documentName,
        file_path: filePath,
        size: selectedFile.size,
        type: selectedFile.type
      };

      const { error: insertError } = await supabase
        .from('documents')
        .insert(documentToInsert);
        
      if (insertError) throw insertError;
      
      toast.success("Document uploaded successfully");
      setDocumentName('');
      setSelectedFile(null);
      fetchDocuments();
      
    } catch (error: any) {
      console.error("Error uploading document:", error);
      toast.error(error.message || "Failed to upload document");
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (id: string, filePath: string) => {
    try {
      // Delete the file from storage
      const { error: storageError } = await supabase.storage
        .from('documents')
        .remove([filePath]);
        
      if (storageError) throw storageError;
      
      // Delete the record from the documents table
      const { error: dbError } = await supabase
        .from('documents')
        .delete()
        .eq('id', id as any);
        
      if (dbError) throw dbError;
      
      setDocuments(documents.filter(doc => doc.id !== id));
      toast.success("Document deleted successfully");
    } catch (error: any) {
      console.error("Error deleting document:", error);
      toast.error(error.message || "Failed to delete document");
    }
  };

  const getDownloadUrl = (filePath: string) => {
    const { data } = supabase.storage
      .from('documents')
      .getPublicUrl(filePath);
      
    return data.publicUrl;
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return bytes + ' bytes';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  };

  const getFileIcon = (fileType: string) => {
    if (fileType.includes('pdf')) return 'pdf';
    if (fileType.includes('word') || fileType.includes('doc')) return 'doc';
    if (fileType.includes('sheet') || fileType.includes('excel') || fileType.includes('xls')) return 'xls';
    return 'file';
  };

  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>Upload New Document</CardTitle>
          <CardDescription>
            Upload documents for users to download. Supported formats: PDF, DOC, DOCX, XLS, XLSX
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleUpload} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="documentName" className="text-sm font-medium">Document Name</label>
              <Input
                id="documentName"
                value={documentName}
                onChange={(e) => setDocumentName(e.target.value)}
                placeholder="Enter document name"
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="file" className="text-sm font-medium">Select File</label>
              <Input
                id="file"
                type="file"
                onChange={handleFileChange}
                accept=".pdf,.doc,.docx,.xls,.xlsx"
              />
            </div>
            
            <div className="flex justify-end">
              <Button 
                type="submit" 
                className="stk-btn-primary" 
                disabled={uploading || !selectedFile}
              >
                {uploading ? 'Uploading...' : 'Upload Document'}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
      
      <Separator />
      
      <Card>
        <CardHeader>
          <CardTitle>Uploaded Documents</CardTitle>
          <CardDescription>
            Manage documents available for users to download.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <p className="text-center py-4">Loading documents...</p>
          ) : documents.length === 0 ? (
            <div className="text-center py-8">
              <File className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-lg font-medium">No documents uploaded yet</h3>
              <p className="mt-1 text-sm text-gray-500">Upload your first document above.</p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Size</TableHead>
                  <TableHead>Date Added</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {documents.map((doc) => (
                  <TableRow key={doc.id}>
                    <TableCell className="font-medium flex items-center gap-2">
                      <File className="h-5 w-5" />
                      {doc.name}
                    </TableCell>
                    <TableCell>
                      {doc.type.split('/').pop()?.toUpperCase()}
                    </TableCell>
                    <TableCell>{formatFileSize(doc.size)}</TableCell>
                    <TableCell>{new Date(doc.created_at).toLocaleDateString()}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <a 
                          href={getDownloadUrl(doc.file_path)}
                          download
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Button size="icon" variant="outline">
                            <Download className="h-4 w-4" />
                          </Button>
                        </a>
                        <Button 
                          size="icon" 
                          variant="destructive"
                          onClick={() => handleDelete(doc.id, doc.file_path)}
                        >
                          <Trash className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
