
"use client";

import * as React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { conversations as initialConversations, messages as initialMessages, templates } from "@/lib/data";
import type { Conversation, Message } from "@/lib/types";
import { SendHorizonal, Copy } from "lucide-react";
import { cn } from "@/lib/utils";

const conversationMessages: { [key: string]: Message[] } = {
    'c1': initialMessages,
    'c2': [
        { id: 'm4', sender: 'System', content: 'Reminder: System maintenance this Friday at 10 PM.', timestamp: 'Yesterday', isCurrentUser: false },
    ],
    'c3': [
        { id: 'm5', sender: 'Grace Akinyi', content: 'Can you help me with the Jones account?', timestamp: '11:00 AM', isCurrentUser: false },
        { id: 'm6', sender: 'You', content: 'Sure, what do you need?', timestamp: '11:01 AM', isCurrentUser: true },
    ]
};


export default function MessagingPage() {
  const [selectedConvo, setSelectedConvo] = React.useState<Conversation>(initialConversations[0]);
  const [messages, setMessages] = React.useState<Message[]>(conversationMessages[initialConversations[0].id]);
  const [newMessage, setNewMessage] = React.useState("");

  const handleSelectConvo = (convo: Conversation) => {
    setSelectedConvo(convo);
    setMessages(conversationMessages[convo.id] || []);
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (newMessage.trim() === "") return;

    const newMsg: Message = {
      id: `m${Date.now()}`,
      sender: "You",
      content: newMessage,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isCurrentUser: true,
    };

    setMessages([...messages, newMsg]);
    setNewMessage("");
  };

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
                    {initialConversations.map((convo, index) => (
                        <React.Fragment key={convo.id}>
                        <Button 
                            variant="ghost" 
                            className={cn(
                                "w-full justify-start h-auto p-2",
                                selectedConvo?.id === convo.id && "bg-muted"
                            )}
                            onClick={() => handleSelectConvo(convo)}
                        >
                            <Avatar className="h-10 w-10 mr-3">
                                <AvatarFallback>{convo.avatar}</AvatarFallback>
                            </Avatar>
                            <div className="text-left">
                                <p className="font-semibold">{convo.name}</p>
                                <p className="text-xs text-muted-foreground truncate max-w-40">{convo.lastMessage}</p>
                            </div>
                        </Button>
                         {index < initialConversations.length - 1 && <Separator />}
                        </React.Fragment>
                    ))}
                    </div>
                </ScrollArea>
            </CardContent>
          </Card>
          <Card className="flex flex-col">
            {selectedConvo ? (
                <>
                    <CardHeader className="flex-shrink-0">
                        <CardTitle>{selectedConvo.name}</CardTitle>
                        <CardDescription>
                            {selectedConvo.id === 'c1' ? 'Discussing the Q3 campaign.' : selectedConvo.id === 'c2' ? 'Platform wide announcements.' : 'Discussing the Jones account.'}
                        </CardDescription>
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
                                        <AvatarFallback>{selectedConvo.avatar}</AvatarFallback>
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
                        <form onSubmit={handleSendMessage} className="relative">
                            <Input 
                                placeholder="Type a message..." 
                                className="pr-12"
                                value={newMessage}
                                onChange={(e) => setNewMessage(e.target.value)}
                            />
                            <Button type="submit" size="icon" variant="ghost" className="absolute top-1/2 right-1 -translate-y-1/2">
                                <SendHorizonal className="h-5 w-5"/>
                            </Button>
                        </form>
                    </div>
                </>
            ) : (
                <div className="flex flex-col items-center justify-center h-full text-muted-foreground">
                    <MessageSquare className="h-12 w-12 mb-4" />
                    <p>Select a conversation to start chatting.</p>
                </div>
            )}
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
