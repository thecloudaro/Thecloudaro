import MigrateEmailHero from "@/components/MigrateEmail/MigrateEmailHero";
import Simple from "@/components/MigrateEmail/Simple";
import EmailMigration from "@/components/MigrateEmail/EmailMigration";
import Find from "@/components/MigrateEmail/Find";
import EmailYou from "@/components/MigrateEmail/EmailYou";
import WhySpacemail from "@/components/MigrateEmail/WhySpacemail";
import ChooseEmail from "@/components/MigrateEmail/ChooseEmail";
import Want from "@/components/MigrateEmail/Want";
import MigrateEmailFAQ from "@/components/MigrateEmail/MigrateEmailFAQ";

const MigrateBusinessEmailPage = () => {
  return (
    <div style={{ backgroundColor: 'rgb(var(--migrate-email-hero-bg))', color: 'rgb(var(--migrate-email-hero-text))' }}>
      <MigrateEmailHero />
      <Simple />
      <EmailMigration />
      <Find />
      <EmailYou />
      <WhySpacemail />
      <ChooseEmail />
      <Want />
      <MigrateEmailFAQ />
      {/* Add more sections here as needed */}
    </div>
  );
};

export default MigrateBusinessEmailPage;

