import clsx from "clsx";

interface CardProps {
	children: React.ReactNode;
	className?: string;
}

function Card({ children, className }: CardProps) {
	return (
		<div
			className={clsx(
				"flex flex-col gap-2 rounded-xl bg-muted p-4 transition-all duration-300",
				className,
			)}
		>
			{children}
		</div>
	);
}

interface CardTitleProps {
	children: React.ReactNode;
}

function CardTitle({ children }: CardTitleProps) {
	return <p className="font-semibold">{children}</p>;
}

interface CardDescriptionProps {
	children: React.ReactNode;
}

function CardDescription({ children }: CardDescriptionProps) {
	return <p className="text-muted-foreground text-sm">{children}</p>;
}

export { Card, CardTitle, CardDescription };
