import React, { useState, useEffect } from 'react';
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

export function InformationEditor() {
  const [pageContent, setPageContent] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    content: '',
    title: ''
  });

  useEffect(() => {
    fetchPageContent();
  }, []);

  const fetchPageContent = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('page_content')
        .select('*')
        .eq('page_name', 'informationen')
        .single();
        
      if (error && error.code !== 'PGRST116') { 
        // PGRST116 is "no rows returned" error, which just means we need to create initial content
        throw error;
      }
      
      if (data) {
        setPageContent(data);
        setFormData({
          content: data.story || '',
          title: data.mission || ''
        });
      }
    } catch (error) {
      console.error("Error fetching page content:", error);
      toast.error("Failed to load information page content");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const updateData = {
        mission: formData.title,
        story: formData.content
      };
      
      // If we already have page content, update it
      if (pageContent) {
        const { error } = await supabase
          .from('page_content')
          .update(updateData)
          .eq('id', pageContent.id);
          
        if (error) throw error;
      } 
      // Otherwise create new page content
      else {
        const { error } = await supabase
          .from('page_content')
          .insert([{
            page_name: 'informationen',
            ...updateData
          }]);
          
        if (error) throw error;
      }
      
      toast.success("Information page content updated successfully");
      fetchPageContent(); // Refresh the data
    } catch (error: any) {
      console.error("Error updating page content:", error);
      toast.error(error.message || "Failed to update information page content");
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Edit Information Page Content</CardTitle>
      </CardHeader>
      <CardContent>
        {loading ? (
          <p className="text-center py-4">Loading content...</p>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="title" className="text-sm font-medium">Page Title</label>
              <Input
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Enter page title"
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="content" className="text-sm font-medium">Page Content</label>
              <Textarea
                id="content"
                name="content"
                value={formData.content}
                onChange={handleChange}
                placeholder="Enter page content"
                className="min-h-[300px]"
              />
              <p className="text-xs text-gray-500">
                You can use markdown formatting for rich text content.
              </p>
            </div>
            
            <div className="flex justify-end">
              <Button type="submit" className="stk-btn-primary">Save Changes</Button>
            </div>
          </form>
        )}
      </CardContent>
    </Card>
  );
}
