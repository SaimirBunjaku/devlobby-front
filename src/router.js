import { createBrowserRouter } from "react-router-dom";
import About from "./components/organisms/About";
import PlayCodeArena from "./components/organisms/PlayCodeArena";
import Blog from "./components/organisms/Blog";
import Chat from "./components/organisms/Chat";
import LearnMore from "./components/organisms/LearnMore";
import ClientLayout from "./components/Pages/LayoutClient";
import AdminLayout from "./components/Pages/LayoutAdmin";
import Landing from "./components/organisms/Landing";
import Login from "./components/organisms/Login";
import Signup from "./components/organisms/Signup";
import ContactUs from "./components/organisms/ContactUs";
import Polls from "./components/molecules/Polls";
import PageNotFound from "./components/organisms/PageNotFound";
import ProfileCard from "./components/organisms/Profile";
import Testimonials from "./components/molecules/Testimonials";
import ChallengeArea from "./components/organisms/ChallengeArea";
import Verification from "./components/organisms/Verification";
import PasswordReset from "./components/organisms/PasswordReset";
import ChallengeCode from "./components/atoms/ChallengeCode";

import AdminSettings from "./components/organisms/AdminSettings";
import AdminLanding from "./components/organisms/AdminLanding";
import UsersAdmin from "./components/organisms/UsersAdmin";
import AdminForm from "./components/organisms/AdminForm";
import DevDiary from "./components/organisms/DevDiary";
import DiaryFeed from "./components/molecules/DiaryFeed";
import DiaryMe from "./components/molecules/DiaryMe";
import AdminCreateChallengeArea from "./components/organisms/AdminCreateChallengeArea";
import EditChallenge from "./components/organisms/EditChallenge";

import ProfileUser from "./components/organisms/About/ProfileUser";

const router = createBrowserRouter([
  {
    path: "",
    element: <ClientLayout />,
    children: [
      {
        index: true,
        element: <Landing />,
      },
      {
        path: "signup",
        element: <Signup />,
      },
      {
        path: "login",
        children: [
          {
            index: true,
            element: <Login />
          }, {
            path: "reset",
            element: <PasswordReset />
          }
        ]
      },
      {
        path: "about",
        element: <About />,
      },
        {
          path: "user/:id", 
          element: <ProfileUser />
        },
      {
        path: "chat",
        element: <Chat />,
      },
      {
        path: 'diary',
        element: <DevDiary />,
        children: [
          {
            index: true,
            element: <DiaryFeed />
          },
          {
            path: "me",
            element: <DiaryMe />
          }
        ]
      },
      {
        path: "playcodearena",
        element: <PlayCodeArena />,
      },
      {
        path: "polls",
        element: <Polls />,
      },
      {
        path: "blog",
        element: <Blog />,
      },
      {
        path: "learn-more",
        element: <LearnMore />,
      },
      {
        path: "testimonials",
        element: <Testimonials />,
      },
      {
        path: "contactus",
        element: <ContactUs />,
      },
      {
        path: "profile",
        element: <ProfileCard />,
      },
      {
        path: "/playcodearena/practical",
        element: <ChallengeArea />,
      },
      {
        path: "/playcodearena/practical/challenge-code/:id",
        element: <ChallengeCode />,
      },
    ],
  },
  {
    path: "admin",
    element: <AdminLayout />,
    children: [
      {
        index: true,
        element: <AdminLanding />
      },
      {
        path: "settings",
        element: <AdminSettings />
      },
      {
        path: "users",
        element: <UsersAdmin />
      },
      {
        path: "challenges",
        element: <AdminCreateChallengeArea />
      },
      {
        path: "challenges/edit/:id",
        element: <EditChallenge />
      }
    ]
  },
  {
    path: "user/:id/verify/:token",
    element: <Verification />,
  },
  {
    path: "adminLogin",
    element: <AdminForm />,
  },
  {
    path: "*",
    element: <PageNotFound />
  },
]);

export default router;