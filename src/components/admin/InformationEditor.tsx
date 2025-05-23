
import React, { useState, useEffect } from 'react';
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Database } from "@/integrations/supabase/types";

type PageContentRow = Database['public']['Tables']['page_content']['Row'];
type PageContentUpdate = Database['public']['Tables']['page_content']['Update'];
type PageContentInsert = Database['public']['Tables']['page_content']['Insert'];

interface PageContent {
  id: string;
  page_name: string;
  mission: string | null;
  story: string | null;
  creator_name: string | null;
  creator_title: string | null;
  creator_bio: string | null;
  creator_image: string | null;
  video_url: string | null;
  updated_at: string | null;
  created_at: string | null;
}

export function InformationEditor() {
  const [pageContent, setPageContent] = useState<PageContent | null>(null);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    content: '',
    title: '',
    video_url: ''
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
        .eq('page_name', 'informationen' as unknown as any)
        .maybeSingle();
        
      if (error && error.code !== 'PGRST116') { 
        // PGRST116 is "no rows returned" error, which just means we need to create initial content
        throw error;
      }
      
      if (data && typeof data === 'object') {
        // Use safe type casting
        const typedData = data as unknown as PageContentRow;
        setPageContent(typedData as unknown as PageContent);
        setFormData({
          content: typedData.story || '',
          title: typedData.mission || '',
          video_url: typedData.video_url || ''
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
      const updateData: PageContentUpdate = {
        mission: formData.title,
        story: formData.content,
        video_url: formData.video_url
      };
      
      // If we already have page content, update it
      if (pageContent) {
        const { error } = await supabase
          .from('page_content')
          .update(updateData as unknown as any)
          .eq('id', pageContent.id as unknown as any);
          
        if (error) throw error;
      } 
      // Otherwise create new page content
      else {
        const insertData: PageContentInsert = {
          page_name: 'informationen',
          ...updateData
        };
        
        const { error } = await supabase
          .from('page_content')
          .insert(insertData as unknown as any);
          
        if (error) throw error;
      }
      
      toast.success("Information page content updated successfully");
      fetchPageContent(); // Refresh the data
    } catch (error: any) {
      console.error("Error updating page content:", error);
      toast.error(error.message || "Failed to update information page content");
    }
  };

  const isYoutubeUrl = (url: string): boolean => {
    if (!url) return true; // Empty URL is valid (not required)
    const pattern = /^(https?:\/\/)?(www\.)?(youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]{11})$/;
    return pattern.test(url);
  };

  const extractVideoId = (url: string): string => {
    if (!url) return '';
    const pattern = /(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
    const matches = url.match(pattern);
    return matches ? matches[1] : '';
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

            <div className="space-y-2">
              <label htmlFor="video_url" className="text-sm font-medium">YouTube Video URL</label>
              <Input
                id="video_url"
                name="video_url"
                value={formData.video_url}
                onChange={handleChange}
                placeholder="Enter YouTube URL (e.g., https://www.youtube.com/watch?v=VIDEO_ID)"
              />
              <p className="text-xs text-gray-500">
                Paste a YouTube video URL to embed it on the information page.
              </p>
              
              {formData.video_url && !isYoutubeUrl(formData.video_url) && (
                <p className="text-xs text-red-500">
                  Please enter a valid YouTube URL
                </p>
              )}

              {formData.video_url && isYoutubeUrl(formData.video_url) && (
                <div className="mt-4 border rounded overflow-hidden">
                  <div className="aspect-w-16 aspect-h-9 bg-gray-100">
                    <iframe 
                      src={`https://www.youtube.com/embed/${extractVideoId(formData.video_url)}`}
                      title="YouTube video preview"
                      className="w-full h-full"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  </div>
                </div>
              )}
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
