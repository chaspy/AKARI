import { useState, useEffect } from 'react';
import { enablePush, isPushEnabled } from '../enablePush';
import { Bell, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';

const VAPID_PUBLIC_KEY = import.meta.env.VITE_VAPID_PUBLIC_KEY || '';

function Settings() {
  const navigate = useNavigate();
  const [notificationEnabled, setNotificationEnabled] = useState(false);
  const [currentWeight, setCurrentWeight] = useState('80');
  const [targetWeight, setTargetWeight] = useState('60');

  useEffect(() => {
    isPushEnabled().then(setNotificationEnabled);
  }, []);

  const handleEnableNotifications = async () => {
    const enabled = await enablePush(VAPID_PUBLIC_KEY);
    setNotificationEnabled(enabled);
    if (enabled) {
      alert('通知が有効になりました');
    }
  };

  const testNotification = async () => {
    try {
      const response = await fetch('/api/notify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: 'AKARI',
          body: 'テスト通知です',
          url: '/log?src=test',
        }),
      });
      if (response.ok) {
        alert('テスト通知を送信しました');
      } else {
        const error = await response.text();
        alert(`エラー: ${error}`);
      }
    } catch (error) {
      console.error('Error sending test notification:', error);
      alert(`通知送信エラー: ${error}`);
    }
  };

  return (
    <div className="min-h-[100dvh] bg-background pb-[calc(64px+env(safe-area-inset-bottom))]">
      {/* Header - NO BORDER */}
      <header
        className="bg-background px-4 pb-2"
        style={{ paddingTop: 'env(safe-area-inset-top, 12px)' }}
      >
        <div className="flex items-center px-6">
          <button
            className="mr-3 p-2 rounded-full hover:bg-white/50 transition-colors"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft className="h-5 w-5 text-muted-foreground" />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-foreground">設定</h1>
            <p className="text-sm text-muted-foreground">通知・プロフィール</p>
          </div>
        </div>
      </header>

      {/* Main Content with STRICT 8pt grid */}
      <main className="px-6 mt-6 space-y-6 max-w-md mx-auto">
        {/* Notification Settings Card - NO BORDER */}
        <div className="rounded-2xl bg-card border border-border shadow-sm p-6">
          <h2 className="text-base font-semibold text-foreground mb-4">通知設定</h2>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Bell className="h-5 w-5 text-muted-foreground" />
                <div>
                  <Label className="text-sm">通知を有効化</Label>
                  <p className="text-xs text-muted-foreground">食事記録のリマインダー</p>
                </div>
              </div>
              <Switch
                checked={notificationEnabled}
                onCheckedChange={handleEnableNotifications}
              />
            </div>

            {notificationEnabled && (
              <Button variant="outline" className="w-full" onClick={testNotification}>
                テスト通知を送信
              </Button>
            )}
          </div>
        </div>

        {/* Profile Settings Card - NO BORDER */}
        <div className="rounded-2xl bg-card border border-border shadow-sm p-6">
          <h2 className="text-base font-semibold text-foreground mb-4">プロフィール</h2>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label className="text-sm">現在の体重 (kg)</Label>
              <Input
                type="number"
                value={currentWeight}
                onChange={(e) => setCurrentWeight(e.target.value)}
                placeholder="80"
                className="rounded-lg"
              />
            </div>

            <div className="space-y-2">
              <Label className="text-sm">目標体重 (kg)</Label>
              <Input
                type="number"
                value={targetWeight}
                onChange={(e) => setTargetWeight(e.target.value)}
                placeholder="60"
                className="rounded-lg"
              />
            </div>

            <Button className="w-full rounded-lg">
              保存
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Settings;
