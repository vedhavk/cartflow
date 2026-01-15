"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useLogin } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useAuthStore } from "@/stores/auth-store";
import gsap from "gsap";
import { Lock, User, ShoppingCart, Sparkles } from "lucide-react";

const loginSchema = z.object({
  username: z.string().min(1, "Username is required"),
  password: z.string().min(1, "Password is required"),
});

type LoginFormData = z.infer<typeof loginSchema>;

// Generate particle positions outside component to avoid recalculation
const PARTICLE_COUNT = 20;
const generateParticlePositions = () =>
  Array.from({ length: PARTICLE_COUNT }, () => ({
    left: Math.random() * 100,
  }));

export default function LoginPage() {
  const router = useRouter();
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const loginMutation = useLogin();

  const containerRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const floatingElements = useRef<HTMLDivElement[]>([]);
  const particlesRef = useRef<HTMLDivElement[]>([]);
  const wavesRef = useRef<HTMLDivElement[]>([]);

  // Generate particle positions on client-side only to avoid hydration mismatch
  const [particlePositions, setParticlePositions] = useState<
    Array<{ left: number }>
  >([]);

  useEffect(() => {
    // Set particle positions after mount
    setParticlePositions(generateParticlePositions());
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "emilys",
      password: "emilyspass",
    },
  });

  useEffect(() => {
    if (isAuthenticated) {
      router.push("/dashboard");
    }
  }, [isAuthenticated, router]);

  // GSAP Animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Floating background elements animation with more complex movements
      floatingElements.current.forEach((el, index) => {
        const tl = gsap.timeline({ repeat: -1 });

        tl.to(el, {
          x: `random(-100, 100)`,
          y: `random(-100, 100)`,
          scale: `random(0.8, 1.2)`,
          rotation: `random(-20, 20)`,
          duration: `random(4, 7)`,
          ease: "sine.inOut",
        })
          .to(el, {
            x: `random(-80, 80)`,
            y: `random(-80, 80)`,
            scale: `random(0.9, 1.1)`,
            rotation: `random(-15, 15)`,
            duration: `random(4, 7)`,
            ease: "sine.inOut",
          })
          .to(el, {
            x: 0,
            y: 0,
            scale: 1,
            rotation: 0,
            duration: `random(3, 5)`,
            ease: "sine.inOut",
          });

        tl.delay(index * 0.5);
      });

      // Animated particles
      particlesRef.current.forEach((particle, index) => {
        gsap.to(particle, {
          y: "-100vh",
          x: `random(-50, 50)`,
          opacity: 0,
          duration: `random(8, 15)`,
          repeat: -1,
          delay: `random(0, 5)`,
          ease: "none",
        });
      });

      // Wave animations
      wavesRef.current.forEach((wave, index) => {
        gsap.to(wave, {
          x: index % 2 === 0 ? "100vw" : "-100vw",
          duration: `random(15, 25)`,
          repeat: -1,
          ease: "none",
        });
      });

      // Card entrance animation
      gsap.fromTo(
        cardRef.current,
        {
          scale: 0.8,
          opacity: 0,
          y: 50,
        },
        {
          scale: 1,
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "back.out(1.7)",
          delay: 0.2,
        }
      );

      // Header animation
      gsap.fromTo(
        headerRef.current,
        {
          opacity: 0,
          y: -20,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power2.out",
          delay: 0.5,
        }
      );

      // Form fields stagger animation
      if (formRef.current) {
        const formElements = formRef.current.querySelectorAll(".form-field");
        gsap.fromTo(
          formElements,
          {
            opacity: 0,
            x: -30,
          },
          {
            opacity: 1,
            x: 0,
            duration: 0.5,
            stagger: 0.1,
            ease: "power2.out",
            delay: 0.7,
          }
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const onSubmit = async (data: LoginFormData) => {
    try {
      // Button pulse animation on submit
      const button = document.querySelector(".submit-btn");
      if (button) {
        gsap.to(button, {
          scale: 0.95,
          duration: 0.1,
          yoyo: true,
          repeat: 1,
        });
      }

      await loginMutation.mutateAsync(data);

      // Success animation before redirect
      gsap.to(cardRef.current, {
        scale: 1.05,
        opacity: 0,
        duration: 0.3,
        ease: "power2.in",
        onComplete: () => router.push("/dashboard"),
      });
    } catch (error) {
      // Error shake animation
      gsap.to(cardRef.current, {
        x: "-10",
        duration: 0.1,
        ease: "power2.out",
        repeat: 5,
        yoyo: true,
      });
      console.error("Login failed:", error);
    }
  };

  return (
    <div
      ref={containerRef}
      className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-br from-cyan-50 via-purple-50 to-blue-50"
    >
      {/* Animated floating background orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          ref={(el) => {
            if (el) floatingElements.current[0] = el;
          }}
          className="absolute top-20 left-20 w-96 h-96 bg-cyan-300/20 rounded-full blur-3xl"
        />
        <div
          ref={(el) => {
            if (el) floatingElements.current[1] = el;
          }}
          className="absolute top-40 right-20 w-[500px] h-[500px] bg-purple-300/20 rounded-full blur-3xl"
        />
        <div
          ref={(el) => {
            if (el) floatingElements.current[2] = el;
          }}
          className="absolute bottom-20 left-1/3 w-[450px] h-[450px] bg-blue-300/20 rounded-full blur-3xl"
        />
        <div
          ref={(el) => {
            if (el) floatingElements.current[3] = el;
          }}
          className="absolute bottom-40 right-1/4 w-80 h-80 bg-purple-200/25 rounded-full blur-3xl"
        />
      </div>

      {/* Animated wave effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
        <div
          ref={(el) => {
            if (el) wavesRef.current[0] = el;
          }}
          className="absolute -left-full top-1/4 w-[200%] h-32 bg-gradient-to-r from-transparent via-cyan-300/40 to-transparent skew-y-3"
        />
        <div
          ref={(el) => {
            if (el) wavesRef.current[1] = el;
          }}
          className="absolute -right-full top-2/3 w-[200%] h-24 bg-gradient-to-r from-transparent via-purple-300/35 to-transparent -skew-y-3"
        />
        <div
          ref={(el) => {
            if (el) wavesRef.current[2] = el;
          }}
          className="absolute -left-full bottom-1/4 w-[200%] h-28 bg-gradient-to-r from-transparent via-blue-300/35 to-transparent skew-y-2"
        />
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {particlePositions.map((position, i) => (
          <div
            key={i}
            ref={(el) => {
              if (el) particlesRef.current[i] = el;
            }}
            className="absolute w-2 h-2 bg-purple-400/40 rounded-full"
            style={{
              left: `${position.left}%`,
              top: `100%`,
            }}
          />
        ))}
      </div>

      {/* Decorative icons */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-10">
        <ShoppingCart className="absolute top-10 left-10 w-12 h-12 text-cyan-500" />
        <Sparkles className="absolute top-20 right-32 w-8 h-8 text-purple-500" />
        <ShoppingCart className="absolute bottom-32 right-20 w-10 h-10 text-blue-500" />
        <Sparkles className="absolute bottom-20 left-40 w-6 h-6 text-cyan-400" />
      </div>

      <Card
        ref={cardRef}
        className="relative z-10 w-full max-w-md shadow-2xl border border-white/50 backdrop-blur-xl bg-white/80"
      >
        <CardHeader ref={headerRef} className="space-y-3 text-center">
          <div className="flex justify-center mb-2">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-purple-500 to-blue-500 rounded-full blur-lg opacity-50" />
              <div className="relative bg-gradient-to-r from-cyan-500 via-purple-500 to-blue-500 p-4 rounded-full shadow-lg">
                <Lock className="w-8 h-8 text-white" />
              </div>
            </div>
          </div>
          <CardTitle className="text-3xl font-bold bg-gradient-to-r from-cyan-600 via-purple-600 to-blue-600 bg-clip-text text-transparent">
            Welcome Back
          </CardTitle>
          <CardDescription className="text-base text-gray-600">
            Sign in to continue your shopping journey ✨
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form
            ref={formRef}
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-5"
          >
            <div className="form-field space-y-2">
              <label
                htmlFor="username"
                className="text-sm font-medium flex items-center gap-2 text-gray-700"
              >
                <User className="w-4 h-4 text-purple-600" />
                Username
              </label>
              <div className="relative group">
                <Input
                  id="username"
                  type="text"
                  {...register("username")}
                  disabled={loginMutation.isPending}
                  className="transition-all duration-300 focus:ring-2 focus:ring-purple-500 border-gray-200 hover:border-purple-300"
                />
              </div>
              {errors.username && (
                <p className="text-sm text-red-500 flex items-center gap-1">
                  {errors.username.message}
                </p>
              )}
            </div>

            <div className="form-field space-y-2">
              <label
                htmlFor="password"
                className="text-sm font-medium flex items-center gap-2 text-gray-700"
              >
                <Lock className="w-4 h-4 text-purple-600" />
                Password
              </label>
              <div className="relative group">
                <Input
                  id="password"
                  type="password"
                  {...register("password")}
                  disabled={loginMutation.isPending}
                  className="transition-all duration-300 focus:ring-2 focus:ring-purple-500 border-gray-200 hover:border-purple-300"
                />
              </div>
              {errors.password && (
                <p className="text-sm text-red-500 flex items-center gap-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            {loginMutation.isError && (
              <div className="form-field">
                <p className="text-sm text-red-500 bg-red-50 p-3 rounded-lg border border-red-200">
                  Invalid credentials. Please try again.
                </p>
              </div>
            )}

            <Button
              type="submit"
              className="submit-btn w-full bg-gradient-to-r from-cyan-500 via-purple-500 to-blue-500 hover:from-cyan-600 hover:via-purple-600 hover:to-blue-600 text-white font-semibold py-6 shadow-lg hover:shadow-xl transition-all duration-300"
              disabled={loginMutation.isPending}
            >
              {loginMutation.isPending ? (
                <span className="flex items-center gap-2">
                  <span className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                  Signing in...
                </span>
              ) : (
                "Sign In"
              )}
            </Button>

            <div className="form-field bg-gradient-to-r from-cyan-50 via-purple-50 to-blue-50 p-4 rounded-lg border border-purple-200">
              <p className="text-sm font-semibold text-purple-900 mb-2 flex items-center gap-2">
                <Sparkles className="w-4 h-4" />
                Demo Credentials
              </p>
              <div className="space-y-1 text-sm text-purple-700">
                <p className="font-mono bg-white/70 px-2 py-1 rounded">
                  Username: emilys
                </p>
                <p className="font-mono bg-white/70 px-2 py-1 rounded">
                  Password: emilyspass
                </p>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
