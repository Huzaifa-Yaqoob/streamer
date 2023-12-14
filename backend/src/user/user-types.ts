// type for returning user data after logging in or registering successfully
export type ReturnUser = {
  email: string;
  username: string;
  token: string;
  avatarUrl?: string | undefined;
};

// type for returning username after updating username successfully
export type ReturnUsername = {
  username: string;
};

// type for returning avatar after updating username successfully
export type ReturnAvatarUrl = {
  avatarUrl: string;
};
