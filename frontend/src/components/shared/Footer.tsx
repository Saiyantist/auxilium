export default function Footer() {
  return (
    <footer className="w-full h-14 bottom-0 left-0 z-50 fixed bg-gradient-to-r from-purple-500 via-purple-400 to-purple-500 text-center text-white text-sm text-muted-foreground">
      <div className="h-full flex justify-center items-center">
        <p className="font-semibold">
          &copy; {new Date().getFullYear()} Auxilium Helpdesk. All rights reserved.
        </p>
      </div>
    </footer>
  )
}