import { createContext, type PropsWithChildren, use, useState } from "react";
import { setThemeServerFn, type Theme } from "~/lib/theme";

type ThemeContextVal = { theme: Theme; setTheme: (val: Theme) => void };
type Props = PropsWithChildren<{ theme: Theme }>;

const ThemeContext = createContext<ThemeContextVal | null>(null);

export function ThemeProvider({ children, theme: initialTheme }: Props) {
	const [theme, setThemeState] = useState<Theme>(initialTheme);

	function setTheme(val: Theme) {
		setThemeState(val);
		setThemeServerFn({ data: val });
	}

	return <ThemeContext value={{ theme, setTheme }}>{children}</ThemeContext>;
}

export function useTheme() {
	const val = use(ThemeContext);
	if (!val) throw new Error("useTheme called outside of ThemeProvider!");
	return val;
}
