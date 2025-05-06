
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { EditAboutUsForm } from "./EditAboutUsForm";
import { UniversityManager } from "./UniversityManager";
import { InformationEditor } from "./InformationEditor";
import { DocumentManager } from "./DocumentManager";
import { DocumentPageEditor } from "./DocumentPageEditor";

export function AdminTabs() {
  return (
    <Tabs defaultValue="universities" className="w-full">
      <TabsList className="grid grid-cols-5 mb-8">
        <TabsTrigger value="universities">Universities</TabsTrigger>
        <TabsTrigger value="pages">Page Content</TabsTrigger>
        <TabsTrigger value="documents">Documents</TabsTrigger>
        <TabsTrigger value="required-docs">Required Docs</TabsTrigger>
        <TabsTrigger value="templates">Templates</TabsTrigger>
      </TabsList>
      
      <TabsContent value="universities">
        <h2 className="text-2xl font-bold mb-4">Manage Universities</h2>
        <p className="text-muted-foreground mb-6">
          Add, edit, or remove universities from the database.
        </p>
        <UniversityManager />
      </TabsContent>
      
      <TabsContent value="pages">
        <h2 className="text-2xl font-bold mb-4">Manage Page Content</h2>
        <p className="text-muted-foreground mb-6">
          Edit content for various pages on the website.
        </p>
        
        <div className="space-y-8">
          <EditAboutUsForm />
          <InformationEditor />
          
          {/* We can add forms for other pages later */}
        </div>
      </TabsContent>
      
      <TabsContent value="documents">
        <h2 className="text-2xl font-bold mb-4">Manage Documents</h2>
        <p className="text-muted-foreground mb-6">
          Upload document requirements and templates for users to download.
        </p>
        <DocumentManager />
      </TabsContent>
      
      <TabsContent value="required-docs">
        <h2 className="text-2xl font-bold mb-4">Required Documents Page</h2>
        <p className="text-muted-foreground mb-6">
          Edit the FAQs, document preparation steps, and other content on the Required Documents page.
        </p>
        <DocumentPageEditor />
      </TabsContent>
      
      <TabsContent value="templates">
        <h2 className="text-2xl font-bold mb-4">Document Templates</h2>
        <p className="text-muted-foreground mb-6">
          Manage downloadable templates for motivation letters, CVs, reference documents, and health information.
        </p>
        
        <div className="space-y-6">
          <div className="bg-muted p-6 rounded-lg">
            <h3 className="text-xl font-medium mb-4">Upload Templates</h3>
            <p className="mb-4">
              Upload document templates that students can download. Organize them by categories such as:
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="border rounded-lg p-4 bg-card">
                <h4 className="font-medium mb-2">Motivation Letters</h4>
                <p className="text-sm text-muted-foreground">
                  Sample motivation letters for university and Studienkolleg applications
                </p>
              </div>
              <div className="border rounded-lg p-4 bg-card">
                <h4 className="font-medium mb-2">CV Templates</h4>
                <p className="text-sm text-muted-foreground">
                  European-style CV templates that follow German standards
                </p>
              </div>
              <div className="border rounded-lg p-4 bg-card">
                <h4 className="font-medium mb-2">Health Insurance</h4>
                <p className="text-sm text-muted-foreground">
                  Guide to health insurance requirements and options in Germany
                </p>
              </div>
              <div className="border rounded-lg p-4 bg-card">
                <h4 className="font-medium mb-2">Reference Documents</h4>
                <p className="text-sm text-muted-foreground">
                  Sample reference letters and documents required by German institutions
                </p>
              </div>
            </div>
            
            <p>
              Use the Documents tab to upload these templates. Make sure to categorize them as "templates" 
              so they appear in the templates section of the Documents page.
            </p>
          </div>
        </div>
      </TabsContent>
    </Tabs>
  );
}
