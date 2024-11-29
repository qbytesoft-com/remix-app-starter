export async function sendDiscordNotification(shop: string , payload: {
  username: string,
  content: string
}): Promise<void> {
  const webhookUrl : any = process.env.DISCORD_WEBHOOK_URL;

  if (!webhookUrl) {
    console.error('Discord webhook URL not found');
    return;
  }


  try {
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error(`Failed to send Discord notification: ${response.statusText}`);
    }

    console.log('Notification sent to Discord!');
  } catch (error) {
    console.error('Error sending notification to Discord:', (error as Error).message);
  }
}
