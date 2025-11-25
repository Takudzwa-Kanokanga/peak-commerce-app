import { SignIn } from "@clerk/nextjs"

export default function SignInPage() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center pt-20 px-4">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-serif font-bold text-foreground mb-2">Welcome Back</h1>
          <p className="text-muted-foreground">Sign in to your Peak Commerce account</p>
        </div>
        <SignIn
          routing="path"
          path="/sign-in"
          redirectUrl="/shop"
          appearance={{
            elements: {
              formButtonPrimary: "bg-primary hover:opacity-90 text-primary-foreground",
              card: "bg-card border border-border",
              headerTitle: "text-foreground font-serif",
              headerSubtitle: "text-muted-foreground",
              formFieldLabel: "text-foreground",
              formFieldInput: "bg-input border-border text-foreground",
            },
          }}
        />
      </div>
    </div>
  )
}
