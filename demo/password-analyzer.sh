#!/bin/bash

################################################################################
# Password Strength Analyzer — Launch Script
#
# This script automates the process of:
# 1. Cleaning up port 8000 (kills any processes using it)
# 2. Starting a Python HTTP server
# 3. Opening the application in the user's default browser
# 4. Managing graceful shutdown with port cleanup
#
# Usage: ./password-analyzer.sh
# Requirements: Python 3, web browser
# Platforms: Linux, macOS, WSL (Windows)
################################################################################

# Set port number
PORT=8000

# Color codes for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${GREEN}[*]${NC} $1"
}

print_error() {
    echo -e "${RED}[!]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[!]${NC} $1"
}

################################################################################
# Get Script Directory & Setup Paths
################################################################################

# Get the directory where this script is located (demo folder)
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

# Web directory: parent of demo folder (password-strength-analyzer)
WEB_DIR="$SCRIPT_DIR/.."

# Verify web directory exists
if [ ! -d "$WEB_DIR" ]; then
    print_error "Website folder not found: $WEB_DIR"
    exit 1
fi

# Verify index.html exists
if [ ! -f "$WEB_DIR/index.html" ]; then
    print_error "index.html not found in: $WEB_DIR"
    exit 1
fi

################################################################################
# Cleanup Function: Kill port 8000
################################################################################

cleanup_port() {
    print_status "Checking for processes using port $PORT..."
    
    # Method 1: Try using lsof (most reliable)
    if command -v lsof &> /dev/null; then
        PIDS=$(lsof -t -i:$PORT 2>/dev/null)
        if [ ! -z "$PIDS" ]; then
            print_warning "Found processes on port $PORT: $PIDS"
            print_status "Terminating processes..."
            for pid in $PIDS; do
                kill -9 $pid 2>/dev/null
                print_status "Killed process $pid"
            done
            sleep 1
        else
            print_status "Port $PORT is free"
        fi
    # Method 2: Try using fuser (alternative if lsof not available)
    elif command -v fuser &> /dev/null; then
        if fuser -n tcp $PORT &>/dev/null; then
            print_warning "Found process on port $PORT"
            print_status "Terminating process..."
            fuser -k $PORT/tcp 2>/dev/null
            sleep 1
        else
            print_status "Port $PORT is free"
        fi
    # Method 3: Try using netstat (older systems)
    elif command -v netstat &> /dev/null; then
        PIDS=$(netstat -tlnp 2>/dev/null | grep ":$PORT " | awk '{print $NF}' | cut -d'/' -f1)
        if [ ! -z "$PIDS" ]; then
            print_warning "Found processes on port $PORT"
            for pid in $PIDS; do
                kill -9 $pid 2>/dev/null
                print_status "Killed process $pid"
            done
            sleep 1
        else
            print_status "Port $PORT is free"
        fi
    else
        print_warning "Cannot verify port status (lsof/fuser/netstat not found)"
    fi
}

################################################################################
# Cleanup Stuck Processes
################################################################################

cleanup_browsers() {
    print_status "Cleaning up stuck processes..."
    
    # # Kill Firefox processes
    # Uncomment if you want to kill Firefox instances
    # if pgrep firefox >/dev/null; then
    #     print_warning "Found Firefox processes, terminating..."
    #     pkill -9 firefox 2>/dev/null
    #     sleep 1
    # fi
    
    # Kill Chrome/Chromium processes (optional)
    if pgrep chrome >/dev/null; then
        print_warning "Found Chrome processes, terminating..."
        pkill -9 chrome 2>/dev/null
        sleep 1
    fi
}

################################################################################
# Open Browser Function
################################################################################

open_browser() {
    print_status "Attempting to open browser..."
    
    # Try multiple methods to open default browser
    if command -v xdg-open &> /dev/null; then
        # Linux method
        print_status "Using xdg-open (Linux)"
        xdg-open "http://localhost:$PORT" 2>/dev/null &
    elif command -v open &> /dev/null; then
        # macOS method
        print_status "Using open (macOS)"
        open "http://localhost:$PORT" 2>/dev/null &
    elif command -v start &> /dev/null; then
        # Windows/WSL method
        print_status "Using start (Windows/WSL)"
        start "http://localhost:$PORT" 2>/dev/null &
    else
        # Fallback: User must open manually
        print_warning "Cannot auto-detect browser command"
        print_warning "Please open your browser and visit: http://localhost:$PORT"
    fi
}

################################################################################
# Trap Function: Handle script exit (Ctrl+C, etc.)
################################################################################

cleanup_on_exit() {
    print_status "Shutting down..."
    
    # Kill the HTTP server
    if [ ! -z "$SERVER_PID" ] && kill -0 $SERVER_PID 2>/dev/null; then
        print_status "Stopping HTTP server (PID: $SERVER_PID)..."
        kill $SERVER_PID 2>/dev/null
        sleep 1
    fi
    
    # Final port cleanup
    print_status "Final port cleanup..."
    cleanup_port
    
    print_status "Goodbye!"
    exit 0
}

# Set trap to call cleanup on EXIT, INT (Ctrl+C), TERM
trap cleanup_on_exit EXIT INT TERM

################################################################################
# Main Execution
################################################################################

print_status "=========================================="
print_status "Password Strength Analyzer — Launch Script"
print_status "=========================================="

# Step 1: Clean up port
print_status "Step 1: Cleaning up port $PORT..."
cleanup_port

# Step 2: Clean up stuck processes
print_status "Step 2: Cleaning up stuck processes..."
cleanup_browsers

# Step 3: Change to web directory
print_status "Step 3: Changing to web directory: $WEB_DIR"
cd "$WEB_DIR" || { print_error "Failed to change directory"; exit 1; }

# Step 4: Start Python HTTP server
print_status "Step 4: Starting Python HTTP server on port $PORT..."
python3 -m http.server $PORT 2>&1 &
SERVER_PID=$!

# Give server time to start
sleep 2

# Verify server started
if kill -0 $SERVER_PID 2>/dev/null; then
    print_status "HTTP server started successfully (PID: $SERVER_PID)"
else
    print_error "Failed to start HTTP server"
    exit 1
fi

# Step 5: Open browser
print_status "Step 5: Opening browser..."
open_browser

# Step 6: Display info and wait
print_status "=========================================="
print_status "✓ Application running at: http://localhost:$PORT"
print_status "✓ Web directory: $WEB_DIR"
print_status "✓ Server PID: $SERVER_PID"
print_status "✓ Press Ctrl+C to stop the server"
print_status "=========================================="

# Wait for server to finish
wait $SERVER_PID

