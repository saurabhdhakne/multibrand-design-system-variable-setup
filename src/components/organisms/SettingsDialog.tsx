import { useId, useState, type ReactNode } from 'react';
import { Button, Label, Separator, Switch } from '@/components/atoms';
import { FormField, ThemeSwitcher } from '@/components/molecules';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export type SettingsValues = {
  displayName: string;
  language: string;
  notifications: { email: boolean; push: boolean; weeklyDigest: boolean };
};

type SettingsDialogProps = {
  defaultValues: SettingsValues;
  onSave?: (values: SettingsValues) => void;
  /** Element that opens the dialog; defaults to a "Settings" button. */
  trigger?: ReactNode;
  defaultOpen?: boolean;
};

function SwitchRow({ label, description, checked, onChange }: {
  label: string;
  description: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}) {
  const id = useId();
  return (
    <div className="flex items-center justify-between gap-gap-md">
      <div className="grid gap-gap-xs">
        <Label htmlFor={id}>{label}</Label>
        <p className="text-caption text-muted-foreground">{description}</p>
      </div>
      <Switch id={id} checked={checked} onCheckedChange={onChange} />
    </div>
  );
}

export function SettingsDialog({ defaultValues, onSave, trigger, defaultOpen }: SettingsDialogProps) {
  const [values, setValues] = useState(defaultValues);
  const setNotification = (key: keyof SettingsValues['notifications']) => (checked: boolean) =>
    setValues({ ...values, notifications: { ...values.notifications, [key]: checked } });

  return (
    <Dialog defaultOpen={defaultOpen}>
      <DialogTrigger asChild>{trigger ?? <Button variant="outline">Settings</Button>}</DialogTrigger>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Settings</DialogTitle>
          <DialogDescription>Manage your profile, notifications and appearance.</DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="general">
          <TabsList className="w-full">
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="appearance">Appearance</TabsTrigger>
          </TabsList>

          <TabsContent value="general" className="grid gap-gap-md pt-inset-sm">
            <FormField
              label="Display name"
              value={values.displayName}
              onChange={(e) => setValues({ ...values, displayName: e.target.value })}
            />
            <div className="grid gap-gap-xs">
              <Label htmlFor="settings-language">Language</Label>
              <Select value={values.language} onValueChange={(language) => setValues({ ...values, language })}>
                <SelectTrigger id="settings-language" className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="en">English</SelectItem>
                  <SelectItem value="hi">हिन्दी</SelectItem>
                  <SelectItem value="de">Deutsch</SelectItem>
                  <SelectItem value="fr">Français</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </TabsContent>

          <TabsContent value="notifications" className="grid gap-gap-md pt-inset-sm">
            <SwitchRow
              label="Email"
              description="Account activity and security alerts."
              checked={values.notifications.email}
              onChange={setNotification('email')}
            />
            <Separator />
            <SwitchRow
              label="Push"
              description="Mentions and direct messages."
              checked={values.notifications.push}
              onChange={setNotification('push')}
            />
            <Separator />
            <SwitchRow
              label="Weekly digest"
              description="A summary of what happened this week."
              checked={values.notifications.weeklyDigest}
              onChange={setNotification('weeklyDigest')}
            />
          </TabsContent>

          <TabsContent value="appearance" className="grid gap-gap-sm pt-inset-sm">
            <p className="text-caption text-muted-foreground">
              Switches the Figma Brand and Theme collections for the whole app.
            </p>
            <ThemeSwitcher />
          </TabsContent>
        </Tabs>

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <DialogClose asChild>
            <Button onClick={() => onSave?.(values)}>Save changes</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
