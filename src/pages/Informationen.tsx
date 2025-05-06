
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowRight, Calendar, Clock, Search } from 'lucide-react';
import { Input } from "@/components/ui/input";

const Informationen = () => {
  const [blogs, setBlogs] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredBlogs, setFilteredBlogs] = useState([]);
  
  useEffect(() => {
    // For now we'll use this seed data, but will replace with Supabase once integrated
    const seedData = [
      {
        id: 1,
        title: "How to Prepare for Aufnahmeprüfung",
        content: "The Aufnahmeprüfung (entrance examination) is a crucial step in your journey to studying at a German university through the Studienkolleg pathway. This test evaluates your academic preparedness and determines whether you're ready to begin your studies.\n\nMost Studienkollegs test applicants in mathematics, and depending on your chosen course track, subjects like physics, biology, or social studies. Here are some tips to help you prepare:\n\n1. Understand the format: Each Studienkolleg has its own examination format. Some have multiple-choice questions, while others require detailed written answers. Research the specific format of your target Studienkolleg.\n\n2. Practice with past papers: If available, practice with past examination papers to familiarize yourself with the question types and difficulty level.\n\n3. Focus on your German language skills: Even though the examination tests your academic knowledge, having good German language skills will help you understand the questions better.\n\n4. Join preparation courses: Consider joining preparation courses specifically designed for Studienkolleg entrance examinations.\n\n5. Use online resources: There are many online forums and resources where you can find tips and materials for preparation.\n\nRemember, preparation is key! Start early and practice consistently to increase your chances of success.",
        image_url: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173",
        created_at: "2023-05-15",
        category: "exams"
      },
      {
        id: 2,
        title: "Student Visa Application Process for Moroccans",
        content: "Applying for a German student visa is a detailed process that requires careful preparation. For Moroccan students, here's a step-by-step guide:\n\n1. Get accepted into a Studienkolleg: Before applying for a visa, you need an acceptance letter from a German Studienkolleg.\n\n2. Schedule an appointment at the German Embassy: Visa appointments can be booked online through the embassy's website. Do this well in advance as waiting times can be long.\n\n3. Prepare your documents: The main documents you'll need include:\n   - Valid passport\n   - Acceptance letter from the Studienkolleg\n   - Proof of financial resources (blocked account with approximately 11,000 euros)\n   - Health insurance\n   - Proof of accommodation in Germany\n   - Biometric photos\n   - Application forms\n   - Language certificate (usually B1 or B2 level)\n   - High school diploma (Baccalauréat) with translation\n   - Motivation letter\n\n4. Attend your visa interview: Be prepared to answer questions about your study plans, why you chose Germany, and how you plan to finance your studies.\n\n5. Wait for processing: The visa processing time can vary, but it's usually 4-8 weeks. Plan accordingly.\n\n6. Collect your visa: Once approved, you'll need to go back to the embassy to collect your visa.\n\nRemember, the German student visa (National Visa – Category D) allows you to enter Germany. After arrival, you'll need to apply for a residence permit at the local immigration office (Ausländerbehörde).\n\nStay organized and start the process early to avoid any last-minute stress!",
        image_url: "https://images.unsplash.com/photo-1544717297-fa95b6ee9643",
        created_at: "2023-06-23",
        category: "visa"
      },
      {
        id: 3,
        title: "Understanding the FSP (Feststellungsprüfung)",
        content: "The Feststellungsprüfung (FSP), or assessment test, is the final examination you'll take at the end of your Studienkolleg program. Successfully passing this exam qualifies you to apply to German universities.\n\nThe FSP is divided into different courses (Kurse) based on your intended field of study:\n\n- T-Kurs: For technical, mathematics, and science programs\n- W-Kurs: For business and economics programs\n- M-Kurs: For medical, biological, and pharmaceutical programs\n- G-Kurs: For humanities and social sciences programs\n- S-Kurs: For language studies programs\n\nEach course has specific subjects that you'll be examined on. For example, if you're in the T-Kurs, you'll be tested on subjects like mathematics, physics, and technical drawing.\n\nThe FSP typically consists of written and oral examinations. The written exams usually take place over several days, with each subject having its own exam. After passing the written exams, you'll proceed to the oral examination, which is conducted by a panel of examiners.\n\nYour FSP result is crucial because it determines your eligibility for university admission and can influence your chances of getting accepted into competitive programs. The higher your score, the better your chances.\n\nPreparation for the FSP starts from day one at the Studienkolleg. Pay attention in classes, complete all assignments, and start revising early. Many Studienkollegs offer mock exams or preparatory sessions before the actual FSP.\n\nRemember, the FSP is challenging but definitely achievable with proper preparation and dedication.",
        image_url: "https://images.unsplash.com/photo-1546410531-bb4caa6b424d",
        created_at: "2023-07-10",
        category: "exams"
      },
      {
        id: 4,
        title: "Finding Accommodation in Germany",
        content: "Finding suitable accommodation is one of the biggest challenges for international students in Germany. Here are some options to consider:\n\n1. Student Dormitories (Studentenwohnheim): These are typically the most affordable option. They're managed by the Studentenwerk (student services organization) and offer single rooms with shared kitchens and bathrooms. Apply early as waiting lists can be long.\n\n2. Shared Flats (Wohngemeinschaft or WG): This is a popular option where you rent a room in an apartment and share common areas with other tenants. Websites like WG-Gesucht, Studenten-WG, and Facebook groups are good places to look.\n\n3. Private Rentals: If you prefer living alone, you can rent a studio apartment (Einzimmerwohnung) or a small apartment (Wohnung). This is more expensive but offers more privacy. ImmobilienScout24 and ImmoWelt are popular websites for finding rentals.\n\n4. Temporary Housing: If you haven't found permanent housing before arriving in Germany, consider temporary options like youth hostels, Airbnb, or couchsurfing while you search locally.\n\nWhen searching for accommodation, be aware of common scams, especially if someone asks for money before you've seen the apartment or signed a contract. Never transfer money without verifying the legitimacy of the offer.\n\nImportant documents for renting in Germany include:\n- Passport\n- Student ID or university acceptance letter\n- Proof of income or financial support\n- Credit report (Schufa) – this might be required for private rentals\n\nStart your search early and be persistent. Finding accommodation in Germany, especially in big cities, can be challenging but not impossible with the right approach and patience.",
        image_url: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267",
        created_at: "2023-08-05",
        category: "living"
      },
      {
        id: 5,
        title: "Working While Studying in Germany",
        content: "As an international student in Germany, you're allowed to work part-time to support your studies. Understanding the rules and finding the right job can make a significant difference in your student life.\n\nWork Regulations:\n- Students from non-EU countries can work 120 full days or 240 half days per year without needing a work permit.\n- During semester breaks, you may be able to work full-time.\n- If you want to work more than the allowed hours, you'll need approval from the Federal Employment Agency and the foreigners' office.\n\nTypes of Student Jobs:\n1. Student Assistant (HiWi): These jobs are available at universities and related to your field of study. They offer flexible hours and relevant experience.\n\n2. Internships: Many companies offer internships for students. Some are mandatory as part of your curriculum and don't count toward your working hour limit.\n\n3. Service Industry: Jobs in restaurants, cafes, or retail shops are common among international students.\n\n4. Tutoring: If you're proficient in certain subjects, consider becoming a tutor for other students.\n\n5. Translation Services: If you're fluent in multiple languages, translation work can be a good option.\n\nFinding a Job:\n- Your university's job portal or career center\n- Online platforms like Studentjob, Jobmensa, or Indeed\n- Local newspapers and bulletin boards\n- Networking with professors, classmates, and friends\n\nImportant Considerations:\n- Balance work with studies – your academic success should remain the priority\n- Understand your tax obligations – students with low income might be exempt from income tax\n- Having German language skills significantly increases your job prospects\n\nWorking while studying not only provides financial support but also gives you valuable experience and helps you integrate into German society. Just make sure to follow the regulations and find a job that complements your studies rather than interferes with them.",
        image_url: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e",
        created_at: "2023-09-12",
        category: "living"
      },
      {
        id: 6,
        title: "German Language Resources for Moroccan Students",
        content: "Mastering German is essential for your success in the Studienkolleg and future university studies. Here are some resources and tips specifically tailored for Moroccan students:\n\nLanguage Schools in Morocco:\n- Goethe-Institut Rabat and Casablanca: Offers structured courses from A1 to C2 levels and official exams\n- Institut Français: Sometimes offers German courses alongside French\n- Private language schools: IELS, Amideast, and other local options\n\nOnline Learning Platforms:\n- DeutschAkademie: Free comprehensive German course\n- Deutsche Welle: Excellent free resources, including news in simple German\n- Duolingo and Babbel: Good for beginners and daily practice\n- Youtube channels: Easy German, Deutsch für Euch, GermanPod101\n\nStudy Materials:\n- 'Menschen' series: Popular textbooks used in many language schools\n- 'Aspekte Neu' for B1+ and above\n- 'Grammatik Aktiv' for grammar practice\n- 'Fit fürs Goethe-Zertifikat' series for exam preparation\n\nLanguage Exchange:\n- Tandem: Find German speakers who want to learn Arabic or French\n- Language exchange events in major Moroccan cities\n- Online communities: Facebook groups for Moroccans learning German\n\nTips for Moroccan Learners:\n- Leverage your knowledge of French if you speak it, as many vocabulary items are similar\n- Focus on pronunciation early, as some German sounds don't exist in Arabic or Moroccan Darija\n- Practice consistently rather than intensively before exams\n- Watch German TV shows with subtitles to improve comprehension\n- Set your phone and social media to German\n\nExam Preparation:\n- Register for exams well in advance as spots fill quickly\n- Take practice tests under timed conditions\n- Focus equally on all four skills: reading, writing, listening, and speaking\n- Consider intensive preparation courses before your exam\n\nRemember, language learning takes time and consistent effort. Aim to reach at least B1 level before your Studienkolleg application, and continue improving your German skills throughout your studies in Germany.",
        image_url: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8",
        created_at: "2023-10-28",
        category: "language"
      }
    ];
    
    setBlogs(seedData);
    setFilteredBlogs(seedData);
  }, []);
  
  useEffect(() => {
    if (searchTerm) {
      const filtered = blogs.filter(blog => 
        blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        blog.content.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredBlogs(filtered);
    } else {
      setFilteredBlogs(blogs);
    }
  }, [searchTerm, blogs]);

  const filterByCategory = (category) => {
    if (category === "all") {
      setFilteredBlogs(blogs);
    } else {
      const filtered = blogs.filter(blog => blog.category === category);
      setFilteredBlogs(filtered);
    }
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="stk-hero py-12">
        <div className="stk-container">
          <h1 className="text-4xl font-bold mb-4">Information & Resources</h1>
          <p className="text-xl max-w-2xl">
            Helpful articles, guides, and tips for Moroccan students applying to Studienkollegs
          </p>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="stk-container py-12">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Main Content */}
          <div className="md:w-3/4 space-y-8">
            {/* Search and Filter */}
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <Input
                  className="pl-10 py-6"
                  placeholder="Search articles..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Tabs defaultValue="all" className="w-full sm:w-auto">
                <TabsList>
                  <TabsTrigger value="all" onClick={() => filterByCategory("all")}>All</TabsTrigger>
                  <TabsTrigger value="exams" onClick={() => filterByCategory("exams")}>Exams</TabsTrigger>
                  <TabsTrigger value="visa" onClick={() => filterByCategory("visa")}>Visa</TabsTrigger>
                  <TabsTrigger value="living" onClick={() => filterByCategory("living")}>Living</TabsTrigger>
                  <TabsTrigger value="language" onClick={() => filterByCategory("language")}>Language</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
            
            {/* Blog Posts */}
            {filteredBlogs.length === 0 ? (
              <div className="text-center py-10">
                <p className="text-xl text-gray-600">No articles found matching your search.</p>
                <Button 
                  className="mt-4 stk-btn-primary" 
                  onClick={() => setSearchTerm('')}
                >
                  Clear Search
                </Button>
              </div>
            ) : (
              <div className="space-y-8">
                {filteredBlogs.map((blog) => (
                  <Card key={blog.id} className="overflow-hidden border-0 shadow-lg">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
                      <div className="md:col-span-1 h-full">
                        <img 
                          src={blog.image_url} 
                          alt={blog.title} 
                          className="w-full h-full object-cover min-h-[200px]"
                        />
                      </div>
                      <div className="md:col-span-2 p-6">
                        <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium mb-3 
                          ${blog.category === 'exams' ? 'bg-blue-100 text-blue-800' : 
                          blog.category === 'visa' ? 'bg-green-100 text-green-800' :
                          blog.category === 'living' ? 'bg-purple-100 text-purple-800' :
                          'bg-yellow-100 text-yellow-800'}`}
                        >
                          {blog.category.charAt(0).toUpperCase() + blog.category.slice(1)}
                        </span>
                        <h2 className="text-2xl font-bold mb-3">{blog.title}</h2>
                        <div className="flex items-center text-gray-500 text-sm mb-4">
                          <Calendar className="h-4 w-4 mr-1" />
                          <span>{blog.created_at}</span>
                          <Clock className="h-4 w-4 ml-4 mr-1" />
                          <span>{Math.ceil(blog.content.length / 1000)} min read</span>
                        </div>
                        <p className="text-gray-600 mb-4 line-clamp-3">
                          {blog.content.slice(0, 150)}...
                        </p>
                        <div className="flex justify-end">
                          <Button variant="ghost" className="group">
                            Read More 
                            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </div>
          
          {/* Sidebar */}
          <div className="md:w-1/4 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Popular Topics</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li>
                    <a href="#" onClick={(e) => { e.preventDefault(); setSearchTerm("visa"); }} className="text-primary hover:underline">
                      Student Visa Requirements
                    </a>
                  </li>
                  <li>
                    <a href="#" onClick={(e) => { e.preventDefault(); setSearchTerm("Aufnahmeprüfung"); }} className="text-primary hover:underline">
                      Entrance Exam Preparation
                    </a>
                  </li>
                  <li>
                    <a href="#" onClick={(e) => { e.preventDefault(); setSearchTerm("language"); }} className="text-primary hover:underline">
                      German Language Resources
                    </a>
                  </li>
                  <li>
                    <a href="#" onClick={(e) => { e.preventDefault(); setSearchTerm("accommodation"); }} className="text-primary hover:underline">
                      Finding Accommodation
                    </a>
                  </li>
                  <li>
                    <a href="#" onClick={(e) => { e.preventDefault(); setSearchTerm("working"); }} className="text-primary hover:underline">
                      Working While Studying
                    </a>
                  </li>
                </ul>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Need Help?</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>Still have questions about studying in Germany?</p>
                <Button className="w-full stk-btn-primary">Contact Us</Button>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Required Documents</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>View our comprehensive guide to all documents needed for your application.</p>
                <Link to="/unterlagen">
                  <Button variant="outline" className="w-full">View Documents</Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      
      {/* Footer */}
      <footer className="bg-primary text-white py-8">
        <div className="stk-container">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">STK Community</h3>
              <p>Helping Moroccan students navigate their path to German universities.</p>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><Link to="/" className="hover:underline">Home</Link></li>
                <li><Link to="/uber-uns" className="hover:underline">About Us</Link></li>
                <li><Link to="/informationen" className="hover:underline">Information</Link></li>
                <li><Link to="/unterlagen" className="hover:underline">Documents</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">Contact</h3>
              <p>Created by Abdelmounaim Oulad Ali</p>
              <div className="flex gap-4 mt-4">
                <a href="#" aria-label="Facebook" className="hover:text-secondary">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                  </svg>
                </a>
                <a href="#" aria-label="Instagram" className="hover:text-secondary">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
          <div className="mt-8 border-t border-white/20 pt-6 text-center">
            <p>&copy; {new Date().getFullYear()} STK Community. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Informationen;
