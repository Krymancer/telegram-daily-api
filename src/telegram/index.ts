import TelegramBot from "node-telegram-bot-api";
import "dotenv/config";
import { parseMillisecondsIntoReadableTime } from "../utils";
// replace the value below with the Telegram token you receive from @BotFather
const token = process.env.TELEGRAM_TOKEN || "";

// Create a bot that uses 'polling' to fetch new updates
export const bot = new TelegramBot(token, { polling: true });

let id = "-656884685";

const warnedsIds: any = [];
const startedIds: any = [];

// Matches "/echo [whatever]"
bot.onText(/\/ping/, (msg: any, match: any) => {
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, "pong");
});

bot.onText(/\/sub/, (msg: any, match: any) => {
  const chatId = msg.chat.id;
  id = chatId;
  console.log(id);
  bot.sendMessage(chatId, "ok");
});

export function verifyDaily(EVENTS: any) {
  EVENTS.forEach((event: any) => {
    if (event.summary.includes("Daily")) {
      if (id != null) {
        const now = new Date();
        const eventDate = new Date(event.start.toString());
        const diff = eventDate.getTime() - now.getTime();

        if (diff < 2.88e7) {
          // Less than 8 hours
          console.log(
            `Tem daily hoje ${
              event.summary
            } => ${parseMillisecondsIntoReadableTime(diff)}`
          );

          const link = event.link.split(/\s+/)[3];
          console.log(link);

          if (diff <= 300000 && diff >= 0 && !warnedsIds.includes(event.id)) {
            warnedsIds.push(event.id);
            event.warned = true;
            bot.sendMessage(id, `Bora gente pra Daily! ${link}`);
          } else if (
            diff <= 0 &&
            diff >= 60000 &&
            !startedIds.includes(event.id)
          ) {
            startedIds.push(event.id);
            bot.sendMessage(id, `Gente estamos na Daily! ${link}`);
          }
        }
      }
    }
  });
}
