export const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) {
      return "Good morning, Admin";
    } else if (hour < 18) {
      return "Good afternoon, Admin";
    } else {
      return "Good evening, Admin";
    }
};