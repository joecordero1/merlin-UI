// components/InfoCard.tsx
import React from "react";

type InfoCardProps = {
  icon: React.ReactNode;
  title: string;
  value: string | number;
  badge?: string;
  colorClass?: string;
  hiddenInfo?: boolean;
};

const InfoCard = ({
	icon,
	title,
	value,
	badge,
	colorClass = "primary",
	hiddenInfo = true,
}: InfoCardProps) => {
	return (
		<div className="xxl:col-span-3 xl:col-span-3 lg:col-span-6 col-span-12">
			<div className="box">
				<div className="box-body">
					<div className="grid grid-cols-12 gap-x-6">
						<div className={`xxxl:col-span-3 col-span-4 flex items-center ecommerce-icon ${colorClass} px-0`}>
							<span className={`rounded-md p-4 bg-${colorClass}/10`}>
								{icon}
							</span>
						</div>
						<div className="xxxl:col-span-9 col-span-8 ps-0">
							<div className="mb-2">{title}</div>
							<div className="text-[#8c9097] dark:text-white/50 mb-1 text-[0.75rem]">
								<span className="font-semibold text-[1.25rem] leading-none text-defaulttextcolor vertical-bottom">
									{value}
								</span>
							</div>
							{badge && (
								<div>
									<span className={`text-[0.75rem] mb-0 ${hiddenInfo ? "hidden" : ""}`}>
                    Incremento de <span className="badge bg-success/10 text-success mx-1">{badge}</span> este mes
									</span>
								</div>
							)}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default InfoCard;
