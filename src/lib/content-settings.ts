/**
 * Editable public facts. Pages render a field only when it has a value.
 * Leave unknown personal details blank — do not guess a name, biography,
 * credential, phone, or address.
 *
 * Inbox access (production): add the owner's sign-in email to `adminEmails`.
 * The address below was published on automationflowlab.com and is the
 * contact we will notify if email delivery is configured.
 */
export const contentSettings = {
  contactEmail: "info@automationflowlab.com",
  domain: "automationflowlab.com",
  ownerName: "",
  ownerRole: "",
  biography: "",
  credentials: "",
  location: "",
  phone: "",
  address: "",
  adminEmails: ["info@automationflowlab.com"],
} as const;
