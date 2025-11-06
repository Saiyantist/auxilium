export default function Footer() {
  return (
    <footer className="w-full bottom-0 left-0 z-50 fixed bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 py-4 border-t text-center text-white text-sm text-muted-foreground">
      &copy; {new Date().getFullYear()} Auxilium Helpdesk. All rights reserved.
    </footer>
  )
}