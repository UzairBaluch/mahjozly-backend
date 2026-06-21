import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default function SettingsPage() {
  return (
    <div className="space-y-8">
      <header>
        <h1 className="display text-3xl">Settings</h1>
        <p className="text-sm text-[color:var(--color-ink)]/70">
          Profile, organization, branding. AI behavior preferences land here too.
        </p>
      </header>

      <Card>
        <CardHeader>
          <CardTitle>Profile</CardTitle>
          <CardDescription>Visible on your public booking page.</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-[color:var(--color-ink)]/70">
            Wire to <span className="mono">GET/PATCH /api/v1/business/profile</span> when ready.
          </p>
          <Button className="mt-4" variant="outline">
            Edit profile
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
