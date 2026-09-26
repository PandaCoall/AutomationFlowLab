-- Enquiry inbox. Rows are business records, not public data.
-- Reads go through authenticated admin server functions only.

create table if not exists submissions (
  id text primary key,
  kind text not null,
  topic text not null default '',
  plan_interest text not null default '',
  name text not null,
  email text not null,
  phone text not null default '',
  organisation text not null default '',
  message text not null default '',
  business_problem text not null default '',
  existing_tools text not null default '',
  desired_outcome text not null default '',
  deadline text not null default '',
  budget_range text not null default '',
  status text not null default 'new',
  notification_status text not null default 'not_configured',
  ip_hash text,
  created_at timestamptz not null default now()
);

create index if not exists submissions_created_idx on submissions (created_at desc);
create index if not exists submissions_email_created_idx on submissions (email, created_at);

create table if not exists inbox_admins (
  email text primary key,
  created_at timestamptz not null default now()
);
