import * as React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { conversations, messages, templates } from "@/lib/data";
import { SendHorizonal, Copy } from "lucide-react";

export default function MessagingPage() {
  return (
    <Tabs defaultValue="chat" className="h-full">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="chat">Internal Chat</TabsTrigger>
        <TabsTrigger value="templates">Templates</TabsTrigger>
      </TabsList>
      <TabsContent value="chat" className="mt-4">
        <div className="grid md:grid-cols-[280px_1fr] gap-4 h-[calc(100vh-12rem)]">
          <Card>
            <CardHeader>
                <CardTitle>Conversations</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
                <ScrollArea className="h-[calc(100vh-18rem)]">
                    <div className="flex flex-col gap-1 p-2">
                    {conversations.map((convo, index) => (
                        <React.Fragment key={convo.id}>
                        <Button variant="ghost" className="w-full justify-start h-auto p-2">
                            <Avatar className="h-10 w-10 mr-3">
                                <AvatarFallback>{convo.avatar}</AvatarFallback>
                            </Avatar>
                            <div className="text-left">
                                <p className="font-semibold">{convo.name}</p>
                                <p className="text-xs text-muted-foreground truncate max-w-40">{convo.lastMessage}</p>
                            </div>
                        </Button>
                         {index < conversations.length - 1 && <Separator />}
                        </React.Fragment>
                    ))}
                    </div>
                </ScrollArea>
            </CardContent>
          </Card>
          <Card className="flex flex-col">
            <CardHeader className="flex-shrink-0">
                <CardTitle>Alice Johnson</CardTitle>
                <CardDescription>Discussing the Smith account.</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow p-0 overflow-hidden">
                <ScrollArea className="h-full">
                <div className="p-4 space-y-4">
                    {messages.map((msg) => (
                    <div
                        key={msg.id}
                        className={`flex items-end gap-2 ${
                        msg.isCurrentUser ? "justify-end" : "justify-start"
                        }`}
                    >
                        {!msg.isCurrentUser && (
                            <Avatar className="h-8 w-8">
                                <AvatarFallback>AJ</AvatarFallback>
                            </Avatar>
                        )}
                        <div
                        className={`max-w-xs rounded-lg p-3 ${
                            msg.isCurrentUser
                            ? "bg-primary text-primary-foreground"
                            : "bg-secondary"
                        }`}
                        >
                        <p className="text-sm">{msg.content}</p>
                        <p className="text-xs mt-1 text-right opacity-70">{msg.timestamp}</p>
                        </div>
                    </div>
                    ))}
                </div>
                </ScrollArea>
            </CardContent>
            <div className="p-4 border-t flex-shrink-0">
                <div className="relative">
                    <Input placeholder="Type a message..." className="pr-12"/>
                    <Button size="icon" variant="ghost" className="absolute top-1/2 right-1 -translate-y-1/2">
                        <SendHorizonal className="h-5 w-5"/>
                    </Button>
                </div>
            </div>
          </Card>
        </div>
      </TabsContent>
      <TabsContent value="templates" className="mt-4">
        <Card>
          <CardHeader>
            <CardTitle>SMS/Email Templates</CardTitle>
            <CardDescription>Quickly use templates for debtor correspondence.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {templates.map((template) => (
              <Card key={template.id} className="bg-muted/50">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-base">{template.title}</CardTitle>
                  <Button variant="ghost" size="sm">
                    <Copy className="mr-2 h-4 w-4"/>
                    Copy
                  </Button>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground whitespace-pre-wrap font-mono">{template.content}</p>
                </CardContent>
              </Card>
            ))}
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
}
