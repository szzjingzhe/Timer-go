import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import useTimerStore from '../stores/useTimerStore';

const TimerSettingsDialog = () => {
  const { activeTimerId, timers, updateTimerSettings, availableRingtones } = useTimerStore();
  const activeTimer = timers.find(t => t.id === activeTimerId);
  const [open, setOpen] = useState(false);
  const [name, setName] = useState(activeTimer?.name || '');
  const [description, setDescription] = useState(activeTimer?.description || '');
  const [ringtone, setRingtone] = useState(activeTimer?.ringtone || 'default');

  const handleSave = () => {
    updateTimerSettings({
      name,
      description,
      ringtone,
    });
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          设置
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>计时器设置</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="name">计时器名称</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="输入计时器名称"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="description">备注</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="输入计时器用途说明"
              rows={3}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="ringtone">铃声</Label>
            <Select value={ringtone} onValueChange={setRingtone}>
              <SelectTrigger>
                <SelectValue placeholder="选择铃声" />
              </SelectTrigger>
              <SelectContent>
                {availableRingtones.map((tone) => (
                  <SelectItem key={tone.id} value={tone.id}>
                    {tone.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="flex justify-end">
          <Button onClick={handleSave}>保存</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TimerSettingsDialog;
