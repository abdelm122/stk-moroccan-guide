
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { EditAboutUsForm } from "./EditAboutUsForm";
import { UniversityManager } from "./UniversityManager";
import { InformationEditor } from "./InformationEditor";

export function AdminTabs() {
  return (
    <Tabs defaultValue="universities" className="w-full">
      <TabsList className="grid grid-cols-3 mb-8">
        <TabsTrigger value="universities">Universities</TabsTrigger>
        <TabsTrigger value="pages">Page Content</TabsTrigger>
        <TabsTrigger value="documents">Documents</TabsTrigger>
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
          Update document requirements and templates.
        </p>
        {/* Document management content will go here */}
      </TabsContent>
    </Tabs>
  );
}
