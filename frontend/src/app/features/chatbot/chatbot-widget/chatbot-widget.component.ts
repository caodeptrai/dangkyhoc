import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChatbotService } from '../../../core/services/chatbot.service';

interface ChatMessage {
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

@Component({
  selector: 'app-chatbot-widget',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './chatbot-widget.component.html',
  styleUrl: './chatbot-widget.component.scss'
})
export class ChatbotWidgetComponent {
  isOpen = false;
  userInput = '';
  messages: ChatMessage[] = [];
  loading = false;
  showZaloPhone = false;
  zaloPhone = '0123.456.789';

  constructor(private chatbotService: ChatbotService) {}

  toggleChat() {
    this.isOpen = !this.isOpen;
    if (this.isOpen && this.messages.length === 0) {
      this.messages.push({
        text: 'Xin chào! 👋 Tôi là trợ lý tư vấn của Hà Ninh. Bạn muốn hỏi về khóa học, học phí, lịch học hay cách đăng ký?',
        sender: 'bot',
        timestamp: new Date()
      });
    }
  }

  sendMessage() {
    const msg = this.userInput.trim();
    if (!msg || this.loading) return;

    this.messages.push({ text: msg, sender: 'user', timestamp: new Date() });
    this.userInput = '';
    this.loading = true;

    this.chatbotService.sendMessage(msg).subscribe({
      next: (res) => {
        this.messages.push({
          text: res.data.reply,
          sender: 'bot',
          timestamp: new Date()
        });
        this.loading = false;
      },
      error: () => {
        this.messages.push({
          text: 'Xin lỗi, đã có lỗi xảy ra. Vui lòng thử lại sau.',
          sender: 'bot',
          timestamp: new Date()
        });
        this.loading = false;
      }
    });
  }

  onKeyPress(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      this.sendMessage();
    }
  }
}
