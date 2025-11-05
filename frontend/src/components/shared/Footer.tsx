export default function Footer() {
  return (
    <footer className="py-4 border-t mt-8 text-center text-sm text-muted-foreground">
      &copy; {new Date().getFullYear()} Auxilium Helpdesk. All rights reserved.
    </footer>
  )
}