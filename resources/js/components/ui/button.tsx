export function Button({ children, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) {
    return (
      <button
        className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
        {...props}
      >
        {children}
      </button>
    );
  }
  