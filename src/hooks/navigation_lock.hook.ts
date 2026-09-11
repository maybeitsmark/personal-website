import { useNavigate } from "react-router";
import { useCallback } from "react";
import { navigateFromTop, transitionLock } from "@/utils/transition_lock.util";

interface NavigationOptions {
  lockScroll?: boolean;
}

export const useNavigationLock = () => {
  const navigate = useNavigate();
  return useCallback((path: string, options: NavigationOptions = {}) => {
    if (transitionLock.current) return;
    if (options.lockScroll) {
      navigateFromTop(path === "/projects" ? "projects" : "home", () => navigate(path));
    } else {
      navigate(path);
    }
  }, [navigate]);
};
