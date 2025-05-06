import React, { useState, useEffect } from 'react';
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { X, Plus, Save } from "lucide-react";
import { Database } from "@/integrations/supabase/types";
import { Json } from '@/integrations/supabase/types';

type PageContentRow = Database['public']['Tables']['page_content']['Row'];
type PageContentInsert = Database['public']['Tables']['page_content']['Insert'];
type PageContentUpdate = Database['public']['Tables']['page_content']['Update'];

interface FAQItem {
  question: string;
  answer: string;
}

interface PreparationStep {
  title: string;
  description: string;
  required_items?: string[];
}

interface DocumentPageContent {
  id: string;
  page_name: string;
  faqs: FAQItem[] | null;
  preparation_steps: PreparationStep[] | null;
  updated_at: string | null;
  created_at?: string | null;
  mission?: string | null;
  story?: string | null;
  creator_name?: string | null;
  creator_title?: string | null;
  creator_bio?: string | null;
  creator_image?: string | null;
  video_url?: string | null;
}

export function DocumentPageEditor() {
  const [pageContent, setPageContent] = useState<DocumentPageContent | null>(null);
  const [loading, setLoading] = useState(true);
  const [faqs, setFaqs] = useState<FAQItem[]>([]);
  const [preparationSteps, setPreparationSteps] = useState<PreparationStep[]>([]);
  const [activeTab, setActiveTab] = useState("faqs");

  useEffect(() => {
    fetchPageContent();
  }, []);

  const fetchPageContent = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('page_content')
        .select('*')
        .eq('page_name', 'unterlagen' as any)
        .maybeSingle();
        
      if (error && error.code !== 'PGRST116') { 
        throw error;
      }
      
      // Use proper type checking and casting with null safety
      if (data && typeof data === 'object') {
        // Create a properly typed document page content object
        const content: DocumentPageContent = {
          id: data.id || '',
          page_name: data.page_name || 'unterlagen',
          faqs: data.faqs as FAQItem[] | null,
          preparation_steps: data.preparation_steps as PreparationStep[] | null,
          updated_at: data.updated_at,
          created_at: data.created_at,
          mission: data.mission,
          story: data.story,
          creator_name: data.creator_name,
          creator_title: data.creator_title,
          creator_bio: data.creator_bio,
          creator_image: data.creator_image,
          video_url: data.video_url
        };
        
        setPageContent(content);
        
        // Initialize state with parsed data or default values
        setFaqs(content.faqs || [{ question: "", answer: "" }]);
        setPreparationSteps(content.preparation_steps || [{ title: "", description: "", required_items: [""] }]);
      } else {
        // Initialize with empty arrays if no data exists
        setFaqs([{ question: "", answer: "" }]);
        setPreparationSteps([{ title: "", description: "", required_items: [""] }]);
      }
    } catch (error) {
      console.error("Error fetching page content:", error);
      toast.error("Failed to load document page content");
      
      // Initialize with default values in case of error
      setFaqs([{ question: "", answer: "" }]);
      setPreparationSteps([{ title: "", description: "", required_items: [""] }]);
    } finally {
      setLoading(false);
    }
  };

  const handleFAQChange = (index: number, field: keyof FAQItem, value: string) => {
    const updatedFaqs = [...faqs];
    updatedFaqs[index] = { ...updatedFaqs[index], [field]: value };
    setFaqs(updatedFaqs);
  };

  const addFAQ = () => {
    setFaqs([...faqs, { question: "", answer: "" }]);
  };

  const removeFAQ = (index: number) => {
    if (faqs.length > 1) {
      const updatedFaqs = faqs.filter((_, i) => i !== index);
      setFaqs(updatedFaqs);
    } else {
      toast.error("You need to keep at least one FAQ");
    }
  };

  const handleStepChange = (index: number, field: keyof PreparationStep, value: string | string[]) => {
    const updatedSteps = [...preparationSteps];
    updatedSteps[index] = { ...updatedSteps[index], [field]: value };
    setPreparationSteps(updatedSteps);
  };

  const handleStepItemChange = (stepIndex: number, itemIndex: number, value: string) => {
    const updatedSteps = [...preparationSteps];
    const currentItems = updatedSteps[stepIndex].required_items || [];
    const newItems = [...currentItems];
    newItems[itemIndex] = value;
    updatedSteps[stepIndex].required_items = newItems;
    setPreparationSteps(updatedSteps);
  };

  const addStepItem = (stepIndex: number) => {
    const updatedSteps = [...preparationSteps];
    const currentItems = updatedSteps[stepIndex].required_items || [];
    updatedSteps[stepIndex].required_items = [...currentItems, ""];
    setPreparationSteps(updatedSteps);
  };

  const removeStepItem = (stepIndex: number, itemIndex: number) => {
    const updatedSteps = [...preparationSteps];
    const currentItems = updatedSteps[stepIndex].required_items || [];
    if (currentItems.length > 1) {
      updatedSteps[stepIndex].required_items = currentItems.filter((_, i) => i !== itemIndex);
      setPreparationSteps(updatedSteps);
    } else {
      toast.error("Step must have at least one required item");
    }
  };

  const addStep = () => {
    setPreparationSteps([...preparationSteps, { title: "", description: "", required_items: [""] }]);
  };

  const removeStep = (index: number) => {
    if (preparationSteps.length > 1) {
      const updatedSteps = preparationSteps.filter((_, i) => i !== index);
      setPreparationSteps(updatedSteps);
    } else {
      toast.error("You need to keep at least one preparation step");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Prepare the update data with proper types
      const updateData = {
        page_name: 'unterlagen',
        faqs: faqs as unknown as Json,
        preparation_steps: preparationSteps as unknown as Json,
      } as unknown as PageContentUpdate;
      
      // If we already have page content, update it
      if (pageContent) {
        const { error } = await supabase
          .from('page_content')
          .update(updateData)
          .eq('id', pageContent.id as any);
          
        if (error) throw error;
      } 
      // Otherwise create new page content
      else {
        const insertData = updateData as unknown as PageContentInsert;
        const { error } = await supabase
          .from('page_content')
          .insert([insertData] as any);
          
        if (error) throw error;
      }
      
      toast.success("Document page content updated successfully");
      fetchPageContent(); // Refresh the data
    } catch (error: any) {
      console.error("Error updating page content:", error);
      toast.error(error.message || "Failed to update document page content");
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Edit Documents Page Content</CardTitle>
        <CardDescription>
          Customize the content shown on the documents page.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {loading ? (
          <p className="text-center py-4">Loading content...</p>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <Tabs defaultValue="faqs" value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="mb-6">
                <TabsTrigger value="faqs">FAQs</TabsTrigger>
                <TabsTrigger value="preparation">Document Preparation Steps</TabsTrigger>
              </TabsList>
              
              <TabsContent value="faqs" className="space-y-6">
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-medium">Frequently Asked Questions</h3>
                    <Button 
                      type="button" 
                      onClick={addFAQ}
                      variant="outline"
                      size="sm"
                    >
                      <Plus className="mr-2 h-4 w-4" /> Add FAQ
                    </Button>
                  </div>
                  
                  <Accordion type="multiple" className="w-full">
                    {faqs.map((faq, index) => (
                      <AccordionItem key={index} value={`faq-${index}`}>
                        <AccordionTrigger className="hover:no-underline">
                          <div className="flex w-full justify-between pr-4">
                            <span>{faq.question || `FAQ Item ${index + 1}`}</span>
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              onClick={(e) => {
                                e.stopPropagation();
                                removeFAQ(index);
                              }}
                              className="h-8 w-8 p-0"
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                        </AccordionTrigger>
                        <AccordionContent>
                          <div className="space-y-4 pt-2">
                            <div className="space-y-2">
                              <label htmlFor={`question-${index}`} className="text-sm font-medium">
                                Question
                              </label>
                              <Input
                                id={`question-${index}`}
                                value={faq.question}
                                onChange={(e) => handleFAQChange(index, 'question', e.target.value)}
                                placeholder="Enter question"
                              />
                            </div>
                            <div className="space-y-2">
                              <label htmlFor={`answer-${index}`} className="text-sm font-medium">
                                Answer
                              </label>
                              <Textarea
                                id={`answer-${index}`}
                                value={faq.answer}
                                onChange={(e) => handleFAQChange(index, 'answer', e.target.value)}
                                placeholder="Enter answer"
                                className="min-h-[150px]"
                              />
                            </div>
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </div>
              </TabsContent>
              
              <TabsContent value="preparation" className="space-y-6">
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-medium">Document Preparation Steps</h3>
                    <Button 
                      type="button" 
                      onClick={addStep} 
                      variant="outline"
                      size="sm"
                    >
                      <Plus className="mr-2 h-4 w-4" /> Add Step
                    </Button>
                  </div>
                  
                  <Accordion type="multiple" className="w-full">
                    {preparationSteps.map((step, stepIndex) => (
                      <AccordionItem key={stepIndex} value={`step-${stepIndex}`}>
                        <AccordionTrigger className="hover:no-underline">
                          <div className="flex w-full justify-between pr-4">
                            <span>{step.title || `Step ${stepIndex + 1}`}</span>
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              onClick={(e) => {
                                e.stopPropagation();
                                removeStep(stepIndex);
                              }}
                              className="h-8 w-8 p-0"
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                        </AccordionTrigger>
                        <AccordionContent>
                          <div className="space-y-4 pt-2">
                            <div className="space-y-2">
                              <label htmlFor={`step-title-${stepIndex}`} className="text-sm font-medium">
                                Step Title
                              </label>
                              <Input
                                id={`step-title-${stepIndex}`}
                                value={step.title}
                                onChange={(e) => handleStepChange(stepIndex, 'title', e.target.value)}
                                placeholder="Enter step title"
                              />
                            </div>
                            <div className="space-y-2">
                              <label htmlFor={`step-desc-${stepIndex}`} className="text-sm font-medium">
                                Step Description
                              </label>
                              <Textarea
                                id={`step-desc-${stepIndex}`}
                                value={step.description}
                                onChange={(e) => handleStepChange(stepIndex, 'description', e.target.value)}
                                placeholder="Enter step description"
                                className="min-h-[100px]"
                              />
                            </div>
                            
                            <div className="space-y-2">
                              <div className="flex justify-between items-center">
                                <label className="text-sm font-medium">Required Items</label>
                                <Button 
                                  type="button" 
                                  onClick={() => addStepItem(stepIndex)} 
                                  variant="outline"
                                  size="sm"
                                >
                                  <Plus className="mr-2 h-4 w-4" /> Add Item
                                </Button>
                              </div>
                              
                              {(step.required_items || []).map((item, itemIndex) => (
                                <div key={itemIndex} className="flex gap-2">
                                  <Input
                                    value={item}
                                    onChange={(e) => handleStepItemChange(stepIndex, itemIndex, e.target.value)}
                                    placeholder={`Item ${itemIndex + 1}`}
                                  />
                                  <Button
                                    type="button"
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => removeStepItem(stepIndex, itemIndex)}
                                    className="h-10 w-10 p-0"
                                  >
                                    <X className="h-4 w-4" />
                                  </Button>
                                </div>
                              ))}
                            </div>
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </div>
              </TabsContent>
            </Tabs>
            
            <div className="flex justify-end">
              <Button type="submit" className="stk-btn-primary">
                <Save className="mr-2 h-4 w-4" /> Save Changes
              </Button>
            </div>
          </form>
        )}
      </CardContent>
    </Card>
  );
}
