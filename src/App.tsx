import { AppHeader, LoginForm, SettingsDialog } from '@/components/organisms';

/** Small playground for `npm run dev`. Component work happens in Storybook (`npm run storybook`). */
export function App() {
  return (
    <div className="min-h-svh">
      <AppHeader
        nav={[
          { label: 'Dashboard', href: '#dashboard' },
          { label: 'Projects', href: '#projects' },
        ]}
        activeHref="#dashboard"
        user={{ name: 'Saurabh Dhakne', email: 'saurabh@company.com' }}
      />
      <main className="grid justify-items-center gap-gap-lg px-inset-md py-layout-sm">
        <SettingsDialog
          defaultValues={{
            displayName: 'Saurabh Dhakne',
            language: 'en',
            notifications: { email: true, push: false, weeklyDigest: true },
          }}
        />
        <LoginForm />
      </main>
    </div>
  );
}
