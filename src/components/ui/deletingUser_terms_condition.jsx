import React from "react";

const AccountDeletionTerms = () => {
	return (
		<div className="space-y-4 text-sm leading-relaxed text-gray-700">
			<h3 className="font-bold text-lg text-gray-800">
				Account Deletion Terms and Conditions
			</h3>
			<p>
				Please read these terms carefully before proceeding with the deletion of
				your account. By confirming your account deletion, you acknowledge and
				agree to the following:
			</p>

			<div>
				<h4 className="font-semibold text-gray-800">
					1. Irreversibility of Deletion
				</h4>
				<ul className="list-disc list-inside">
					<li>
						<strong>Permanent Data Loss:</strong> Deleting your account is
						permanent. All data including:
						<ul className="list-disc list-inside pl-4">
							<li>Profile info</li>
							<li>Transaction history</li>
							<li>Preferences</li>
							<li>Uploaded content</li>
							<li>Communication records</li>
						</ul>
						will be deleted.
					</li>
					<li>No Recovery: The account cannot be restored once deleted.</li>
				</ul>
			</div>

			<div>
				<h4 className="font-semibold text-gray-800">2. Impact on Services</h4>
				<ul className="list-disc list-inside">
					<li>Loss of access to all features and services.</li>
					<li>
						Disconnection from any linked third-party services using your
						account.
					</li>
				</ul>
			</div>

			<div>
				<h4 className="font-semibold text-gray-800">
					3. Data Retention for Legal & Compliance
				</h4>
				<ul className="list-disc list-inside">
					<li>
						We may retain minimal anonymized data for legal, fraud, or audit
						purposes.
					</li>
					<li>All such data is anonymized and not linked to your identity.</li>
				</ul>
			</div>

			<div>
				<h4 className="font-semibold text-gray-800">
					4. Financial Implications
				</h4>
				<ul className="list-disc list-inside">
					<li>
						Outstanding balances or subscriptions must be resolved before
						deletion.
					</li>
					<li>
						It is your responsibility to cancel any subscriptions to avoid
						future charges.
					</li>
				</ul>
			</div>

			<div>
				<h4 className="font-semibold text-gray-800">5. Confirmation</h4>
				<p>
					By clicking "Yes, Delete My Account", you confirm your understanding
					and acceptance of these terms.
				</p>
			</div>

			<p className="italic text-gray-600">
				Please back up any data you wish to retain before proceeding.
			</p>
		</div>
	);
};

export default AccountDeletionTerms;
