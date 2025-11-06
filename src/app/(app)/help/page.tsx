import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const faqs = [
  {
    question: "How do I start the auto-dialer?",
    answer: "Navigate to the 'Dialer' page and click the 'Start Auto-Dialing' button. The system will automatically start calling leads from your assigned queue.",
  },
  {
    question: "Where can I see my performance statistics?",
    answer: "Go to the 'My Stats' page. There you will find your daily targets, call metrics, and success rates.",
  },
  {
    question: "How do I update a lead's information after a call?",
    answer: "After ending a call, a wrap-up window will appear. You can update the call outcome, add notes, and schedule a follow-up directly from there.",
  },
];

export default function HelpPage() {
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Frequently Asked Questions</CardTitle>
            <CardDescription>Find answers to common questions about using the system.</CardDescription>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger>{faq.question}</AccordionTrigger>
                  <AccordionContent>{faq.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </CardContent>
        </Card>
      </div>
      <div>
        <Card>
          <CardHeader>
            <CardTitle>Submit a Ticket</CardTitle>
            <CardDescription>Need more help? Open a support ticket and our team will get back to you.</CardDescription>
          </CardHeader>
          <CardContent>
            <form className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="subject">Subject</Label>
                <Input id="subject" placeholder="E.g., 'Dialer is not working'" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea id="description" placeholder="Please describe your issue in detail..." rows={5}/>
              </div>
              <Button>Submit Ticket</Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
