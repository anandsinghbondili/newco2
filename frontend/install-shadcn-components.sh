#!/bin/bash

# Move to project root (optional if you already are)
cd "$(dirname "$0")"

echo "🧱 Installing all ShadCN components..."

components=(
  accordion
  alert
  alert-dialog
  aspect-ratio
  avatar
  badge
  button
  calendar
  card
  carousel
  checkbox
  collapsible
  command
  context-menu
  data-table
  date-picker
  dialog
  drawer
  dropdown-menu
  form
  hover-card
  input
  label
  menubar
  navigation-menu
  pagination
  popover
  progress
  radio-group
  scroll-area
  select
  separator
  sheet
  skeleton
  slider
  sonner
  switch
  table
  tabs
  textarea
  toast
  toggle
  tooltip
)

for component in "${components[@]}"
do
  echo "➡️  Installing $component..."
  npx shadcn@latest add $component
done

echo "✅ All components installed!"
