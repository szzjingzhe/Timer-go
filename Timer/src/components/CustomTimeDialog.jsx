import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import useTimerStore from '../stores/useTimerStore';

const CustomTimeDialog = () => {
  const { activeTimerId, timers, updateTimerSettings } = useTimerStore();
  const activeTimer = timers.find(t => t.id === activeTimerId);
  const [open, setOpen] = useState(false);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  const handleSave = () => {
    const totalSeconds = hours * 3600 + minutes * 60 + seconds;
    if (totalSeconds > 0) {
      updateTimerSettings({
        isCountdown: true,
        countdownDuration: totalSeconds,
        remaining: totalSeconds,
        duration: 0,
        isRunning: false,
      });
      setOpen(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          自定义时间
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>设置自定义时间</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-3 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="hours">小时</Label>
              <Input
                id="hours"
                type="number"
                min="0"
                value={hours}
                onChange={(e) => setHours(parseInt(e.target.value) || 0)}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="minutes">分钟</Label>
              <Input
                id="minutes"
                type="number"
                min="0"
                max="59"
                value={minutes}
                onChange={(e) => setMinutes(parseInt(e.target.value) || 0)}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="seconds">秒</Label>
              <Input
                id="seconds"
                type="number"
                min="0"
                max="59"
                value={seconds}
                onChange={(e) => setSeconds(parseInt(e.target.value) || 0)}
              />
            </div>
          </div>
        </div>
        <div className="flex justify-end">
          <Button onClick={handleSave}>保存</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CustomTimeDialog;
