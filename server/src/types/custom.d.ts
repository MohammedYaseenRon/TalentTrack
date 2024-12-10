declare global {
    namespace Express {
      interface Request {
        user?: {
          userId: string;
          role: string;
        }; // Replace with more specific type if needed
      }
    }
  }
  
  export {};
  