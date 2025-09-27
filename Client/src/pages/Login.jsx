import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  useUserLoginMutation,
  useUserSignupMutation,
} from "@/features/api/authApi";
import { userLoggedIn } from "@/features/authSlice";
import { Loader } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export function Login() {
  const [signup, setSignup] = useState({ name: "", email: "", password: "" });
  const [login, setLogin] = useState({ email: "", password: "" });
  const dispatch = useDispatch()
  const [
    loginUser,
    {
      data: loginUserData,
      isLoading: isLoadingLoginUser,
      isSuccess: isSuccessLoginUser,
      isError: isErrorLoginUser,
      error:errorLogin
    },
  ] = useUserLoginMutation();
  const [
    signupUser,
    {
      data: signupUserData,
      isLoading: isLoadingSignupUser,
      isError: isErrorSignupUser,
     isSuccess:isSuccessSignupUser,
     error:errorSignup
    },
  ] = useUserSignupMutation();

  const navigate = useNavigate()

  const onChangeHandler = (e, type) => {
    const { name, value } = e.target;
    if (type == "signup") {
      setSignup({ ...signup, [name]: value });
    } else {
      setLogin({ ...login, [name]: value });
    }
  };
   useEffect(()=>{
    if(isSuccessLoginUser && loginUserData) {
      toast.success(loginUserData.message || "Login Successful")
      dispatch(userLoggedIn({ user:loginUserData.user }))
      navigate("/")
    }
    if(isErrorLoginUser && !loginUserData) {
      toast.error(errorLogin.data.message)
    }
    if(isSuccessSignupUser && signupUserData) {
      toast.success(signupUserData.message || "Signup Successful")
      navigate("/")
      dispatch(userLoggedIn({ user:signupUserData.user }))
    }
    if(isErrorSignupUser && !signupUserData) {
      toast.error(errorSignup.data.message)
    }

   },[isSuccessLoginUser,isSuccessSignupUser,isErrorLoginUser,isErrorSignupUser,signupUserData,loginUserData,errorLogin,errorSignup,navigate,dispatch])

  const onSubmitHandler =async (type) => {
    
    const inputData = type === "signup" ? signup : login;
    const action = type == "signup" ? signupUser : loginUser
    
  await action(inputData)

  
  };

  

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="flex  justify-center w-full max-w-sm flex-col gap-6">
        <Tabs defaultValue="login">
          <TabsList className="w-full">
            <TabsTrigger value="login">Login</TabsTrigger>
            <TabsTrigger value="signup">Signup</TabsTrigger>
          </TabsList>
          <TabsContent value="login">
            <Card>
              <CardHeader>
                <CardTitle>Login</CardTitle>
                <CardDescription>Login +</CardDescription>
              </CardHeader>
              <CardContent className="grid gap-6">
                <div className="grid gap-3">
                  <Label htmlFor="tabs-demo-name">email</Label>
                  <Input
                    id="tabs-demo-name"
                    placeholder="email"
                    name="email"
                    value={login.email}
                    onChange={(e) => onChangeHandler(e, "login")}
                  />
                </div>

                <div className="grid gap-3">
                  <Label htmlFor="tabs-demo-username">password</Label>
                  <Input
                    id="tabs-demo-username"
                    placeholder="enter password"
                    name="password"
                    value={login.password}
                    onChange={(e) => onChangeHandler(e, "login")}
                  />
                </div>
              </CardContent>
              <CardFooter>
                <Button disable={isLoadingLoginUser} onClick={() => onSubmitHandler("login")}>
                  {
                    isLoadingLoginUser ? <><Loader className="px-4 w-4 h-4 animate-spin"/></> : "Login"
                  }
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
          <TabsContent value="signup">
            <Card>
              <CardHeader>
                <CardTitle>Sign up</CardTitle>
                <CardDescription>
                  Create a new account and Click signup when you are done.
                </CardDescription>
              </CardHeader>
              <CardContent className="grid gap-6">
                <div className="grid gap-3">
                  <Label htmlFor="tabs-demo-currents">Name</Label>
                  <Input
                    id="tabs-demo-currents"
                    name="name"
                    value={signup.name}
                    onChange={(e) => onChangeHandler(e, "signup")}
                  />
                </div>
                <div className="grid gap-3">
                  <Label htmlFor="tabs-demo-current">Email</Label>
                  <Input
                    id="tabs-demo-current"
                    name="email"
                    value={signup.email}
                    onChange={(e) => onChangeHandler(e, "signup")}
                  />
                </div>
                <div className="grid gap-3">
                  <Label htmlFor="tabs-demo-new">password</Label>
                  <Input
                    id="tabs-demo-new"
                    name="password"
                    value={signup.password}
                    onChange={(e) => onChangeHandler(e, "signup")}
                  />
                </div>
              </CardContent>
              <CardFooter>
                <Button disable= {isLoadingSignupUser} onClick={() => onSubmitHandler("signup")}>
                {
                    isLoadingSignupUser ? <>< Loader className="px-4 w-4 h-4 animate-spin"/></> : "Signup"
                  }  
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
