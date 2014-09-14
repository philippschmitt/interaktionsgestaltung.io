# http://localhost:8000/

import sys
import BaseHTTPServer
from SimpleHTTPServer import SimpleHTTPRequestHandler
import os
import webbrowser

def main(*argv):
  if not argv: argv = sys.argv

  folder,f = os.path.split(__file__)
  if not folder == '':
    os.chdir(folder)
    
  HandlerClass = SimpleHTTPRequestHandler
  ServerClass  = BaseHTTPServer.HTTPServer
  Protocol     = "HTTP/1.0"
  DefaultPort  = 8000

  if sys.argv[1:]:
      port = int(sys.argv[1])
  else:
      port = DefaultPort
  server_address = ('127.0.0.1', port)

  HandlerClass.protocol_version = Protocol
  httpd = ServerClass(server_address, HandlerClass)

  sa = httpd.socket.getsockname()
  print "Serving HTTP on", sa[0], "port", sa[1], "..."

  webbrowser.open("http://localhost:"+str(port))

  httpd.serve_forever()

if __name__ == '__main__':
  main()