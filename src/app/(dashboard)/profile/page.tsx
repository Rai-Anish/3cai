import { getProfileData } from "@/app/actions/get-profile";
import { PersonalInfoCard } from "./_components/profile-info-card";
import { TokenStatsCard } from "./_components/token-stat-card";
import { SecurityCard } from "./_components/security-card";
import { DangerZoneCard } from "./_components/danger-zone-card";
import { redirect } from "next/navigation";

export default async function ProfilePage() {
  let data;
  try {
    data = await getProfileData();
  } catch {
    redirect("/sign-in");
  }

  const { user, tokens, stats, linkedAccounts } = data;

  // Determine if user has a password-based account
  const hasPassword = linkedAccounts.some(
    (a) => a.providerId === "credential"
  );

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 py-10 space-y-3">

        {/* Page header */}
        <div className="mb-8">
          <h1 className="font-mono text-2xl font-bold tracking-tighter text-white mt-1">
            Account Settings
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Manage your personal information, security, and account preferences.
          </p>
        </div>

        {/* Personal info + Token stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <PersonalInfoCard
            name={user.name}
            email={user.email}
            createdAt={user.createdAt}
            hasPassword={hasPassword}
          />
          <TokenStatsCard
            subscriptionBalance={tokens?.subscriptionBalance ?? 0}
            creditBalance={tokens?.creditBalance ?? 0}
            lifetimeGranted={tokens?.lifetimeGranted ?? 0}
            totalUsed={stats.totalUsed}
            totalRequests={stats.totalRequests}
            lastUsed={stats.lastUsed}
          />
        </div>

        {/* Security */}
        <SecurityCard
          linkedAccounts={linkedAccounts}
          hasPassword={hasPassword}
        />

        {/* Danger zone */}
        <DangerZoneCard
          hasPassword={hasPassword}
          email={user.email}
        />

      </div>
    </div>
  );
}
