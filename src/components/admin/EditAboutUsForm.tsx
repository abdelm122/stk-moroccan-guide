
import { useState, useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { Database } from "@/integrations/supabase/types";

// Define types using the Supabase generated types
type PageContent = Database['public']['Tables']['page_content']['Row'];
type PageContentUpdate = Database['public']['Tables']['page_content']['Update'];
type PageContentInsert = Database['public']['Tables']['page_content']['Insert'];

// Form schema with validation
const formSchema = z.object({
  mission: z.string().min(10, "Mission statement must be at least 10 characters"),
  story: z.string().min(10, "Story must be at least 10 characters"),
  creator_name: z.string().min(1, "Creator name is required"),
  creator_title: z.string().min(1, "Creator title is required"),
  creator_bio: z.string().min(10, "Creator bio must be at least 10 characters"),
  creator_image: z.string().url("Must be a valid image URL"),
});

type FormData = z.infer<typeof formSchema>;

export function EditAboutUsForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [existingContent, setExistingContent] = useState<PageContent | null>(null);

  // Initialize form with default values
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      mission: "",
      story: "",
      creator_name: "",
      creator_title: "",
      creator_bio: "",
      creator_image: "",
    },
  });

  useEffect(() => {
    async function fetchContent() {
      setIsLoading(true);
      try {
        // We need to use the typed fetch to properly handle the response
        const { data, error } = await supabase
          .from("page_content")
          .select("*")
          .eq("page_name", "uber-uns")
          .maybeSingle();

        if (error && error.code !== "PGRST116") {
          // PGRST116 means not found
          throw error;
        }

        // Only process data if it's valid and has the expected shape
        if (data && typeof data === 'object' && 'id' in data) {
          // Store the full content object for later use
          setExistingContent(data as PageContent);
          
          // Reset form with existing data
          form.reset({
            mission: data.mission || "",
            story: data.story || "",
            creator_name: data.creator_name || "",
            creator_title: data.creator_title || "",
            creator_bio: data.creator_bio || "",
            creator_image: data.creator_image || "",
          });
        }
      } catch (error) {
        console.error("Error fetching content:", error);
        toast.error("Failed to load page content");
      } finally {
        setIsLoading(false);
      }
    }

    fetchContent();
  }, [form]);

  async function onSubmit(values: FormData) {
    setIsSaving(true);
    try {
      // Check if content already exists
      const { data: existing } = await supabase
        .from("page_content")
        .select("id")
        .eq("page_name", "uber-uns")
        .maybeSingle();

      // Create update data with proper typing
      const updateData = {
        ...values,
        updated_at: new Date().toISOString(),
      } as PageContentUpdate;

      let result;
      if (existing && typeof existing === 'object' && 'id' in existing) {
        // Update existing content
        result = await supabase
          .from("page_content")
          .update(updateData)
          .eq("id", existing.id);
      } else {
        // Insert new content with page_name
        const insertData = {
          page_name: "uber-uns",
          ...values,
        } as PageContentInsert;
        
        result = await supabase
          .from("page_content")
          .insert([insertData]);
      }

      if (result.error) throw result.error;

      toast.success("About Us page content updated successfully");
    } catch (error) {
      console.error("Error saving content:", error);
      toast.error("Failed to save page content");
    } finally {
      setIsSaving(false);
    }
  }

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Loading About Us page content...</CardTitle>
          <CardDescription>Please wait while we fetch the current content.</CardDescription>
        </CardHeader>
        <CardContent className="flex justify-center py-8">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Edit About Us Page</CardTitle>
        <CardDescription>
          Update the content shown on the Über Uns page. All fields are required.
        </CardDescription>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent className="space-y-6">
            <FormField
              control={form.control}
              name="mission"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Mission Statement</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Enter the mission statement for STK Community..."
                      className="min-h-32"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="story"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Our Story</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Enter the story of STK Community..."
                      className="min-h-32"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="creator_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Creator Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter creator's name..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="creator_title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Creator Title</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter creator's title..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="creator_bio"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Creator Bio</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Enter creator's biography..."
                      className="min-h-24"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="creator_image"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Creator Image URL</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter URL to creator's image..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter>
            <Button type="submit" disabled={isSaving} className="w-full">
              {isSaving ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                "Save Changes"
              )}
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}
