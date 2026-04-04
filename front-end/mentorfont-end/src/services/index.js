/**
 * Services Barrel File
 * 
 * Centralized exports for all API interactions to prevent cluttered imports across the UI.
 * Future components should import services from this unified entry point.
 */

export { default as AxiosInstance } from "./AxiosInstance";

// Auth Services
export { default as LoginService } from "./LoginService";
export { default as SignupService } from "./Signup";

// Mentor/Mentee Profile Services
export { default as GetAllMentosService } from "./GetAllmentors";
export { default as GetAllMenteeService } from "./GetAllMentee";
export { default as GetMenteeprofileser } from "./GetMenteeProfile";
export { default as MentorProfileSer } from "./MentorProfile";

// Searching and Filtering
export { default as SearchMentorSer } from "./SearchMentor";
export { default as FilterMentorSer } from "./FilterMentor";
export { default as LowToHighFiltering } from "./Lowtohigh";

// Communication & Sessions
export { default as CreateConvo } from "./Convo";
export { GetAllMessageSer, SendMessageSer } from "./Message";
export { GetAllSessionSer, CreateSessionSer } from "./Session";

// Tasks
export { getTask, CreateTaskSer, DeleteExpireOne } from "./Task";

// Utility Features
export { default as WishListSer } from "./AddToWishList";
export { default as CreatePayment } from "./Payment";
export { GetNotification } from "./Notification";
export { default as AiSolverSer } from "./AiSolver";
export { default as AiTaskCreationSer } from "./AiTaskCreation";
export { ReviewAnalizedSer } from "./ReviewAnalized";
export { default as PerformanceSer } from "./Performance";
export { default as FeedbackSer } from "./Feedback";
