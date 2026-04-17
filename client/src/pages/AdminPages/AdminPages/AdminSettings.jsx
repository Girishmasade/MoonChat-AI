import React, { useState } from "react";

/* ── Reusable sub-components ── */

const SectionCard = ({ children }) => (
  <div className="bg-gray-900 border border-gray-800 rounded-xl p-5 mb-4">
    {children}
  </div>
);

const SectionTitle = ({ children }) => (
  <p className="text-sm font-semibold text-gray-200 mb-4">{children}</p>
);

const FieldLabel = ({ children }) => (
  <span className="block text-[10px] text-gray-500 uppercase tracking-wider mb-1.5">
    {children}
  </span>
);

const FieldRow = ({ label, children }) => (
  <div className="mb-3.5">
    <FieldLabel>{label}</FieldLabel>
    {children}
  </div>
);

const inputCls =
  "w-full bg-[#0b0e11] border border-gray-800 text-gray-100 text-sm rounded-lg px-3 py-2 placeholder-gray-600 outline-none focus:border-gray-600 transition";

const ToggleRow = ({ label, sub, defaultChecked }) => {
  const [on, setOn] = useState(defaultChecked);
  return (
    <div className="flex items-center justify-between py-3 border-b border-gray-800 last:border-b-0">
      <div>
        <p className="text-sm text-gray-200 m-0">{label}</p>
        {sub && <p className="text-xs text-gray-500 mt-0.5">{sub}</p>}
      </div>
      <button
        onClick={() => setOn(!on)}
        className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 focus:outline-none ${
          on ? "bg-blue-600" : "bg-gray-700"
        }`}
      >
        <span
          className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow transition duration-200 ${
            on ? "translate-x-4" : "translate-x-0"
          }`}
        />
      </button>
    </div>
  );
};

/* ── Main Component ── */

const Settings = () => {
  const [saving, setSaving] = useState(false);
  const [saved, setSaved]   = useState(false);

  const handleSave = () => {
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    }, 800);
  };

  return (
    <div className=" p-2">

      {/* Header */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-50">Settings</h2>
        <p className="text-sm text-gray-500 mt-1">Manage your platform configuration</p>
      </div>

      {/* AI Configuration */}
      <SectionCard>
        <SectionTitle>AI Configuration</SectionTitle>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <FieldRow label="Model name">
            <select className={`${inputCls} cursor-pointer`} defaultValue="gpt-4">
              <option value="gpt-4">GPT-4</option>
              <option value="gpt-3.5">GPT-3.5 Turbo</option>
              <option value="claude">Claude Sonnet</option>
            </select>
          </FieldRow>
          <FieldRow label="Temperature">
            <input defaultValue="0.7" className={inputCls} />
          </FieldRow>
          <FieldRow label="Max tokens">
            <input defaultValue="2048" className={inputCls} />
          </FieldRow>
          <FieldRow label="Top-P">
            <input defaultValue="1.0" className={inputCls} />
          </FieldRow>
        </div>
        <FieldRow label="System prompt">
          <textarea
            defaultValue="You are a helpful assistant."
            rows={3}
            className={`${inputCls} resize-none`}
          />
        </FieldRow>
      </SectionCard>

      {/* API Keys */}
      <SectionCard>
        <SectionTitle>API Keys</SectionTitle>
        <FieldRow label="OpenAI API key">
          <input
            type="password"
            placeholder="sk-••••••••••••••••••••"
            className={inputCls}
          />
        </FieldRow>
        <FieldRow label="Anthropic API key">
          <input
            type="password"
            placeholder="sk-ant-••••••••••••••••"
            className={inputCls}
          />
        </FieldRow>
        <p className="text-xs text-gray-500 mt-1">
          Keys are encrypted and never exposed in the UI after saving.
        </p>
      </SectionCard>

      {/* Feature Flags */}
      <SectionCard>
        <SectionTitle>Feature Flags</SectionTitle>
        <ToggleRow label="User registration"  sub="Allow new users to sign up"               defaultChecked={true}  />
        <ToggleRow label="AI suggestions"     sub="Show AI reply suggestions to users"       defaultChecked={true}  />
        <ToggleRow label="File sharing"       sub="Let users send files in chat"             defaultChecked={false} />
        <ToggleRow label="Maintenance mode"   sub="Take the platform offline for all users"  defaultChecked={false} />
      </SectionCard>

      {/* Save / Discard */}
      <div className="flex justify-end gap-2.5">
        <button className="px-4 py-2 text-sm rounded-lg border border-gray-700 text-gray-400 bg-transparent hover:border-gray-500 hover:text-gray-200 transition cursor-pointer">
          Discard
        </button>
        <button
          onClick={handleSave}
          disabled={saving}
          className={`px-5 py-2 text-sm font-medium rounded-lg transition cursor-pointer ${
            saved
              ? "bg-green-600 text-white border border-green-600"
              : "bg-blue-600 hover:bg-blue-500 text-white border border-blue-600"
          } disabled:opacity-60`}
        >
          {saving ? "Saving…" : saved ? "✓ Saved" : "Save settings"}
        </button>
      </div>

    </div>
  );
};

export default Settings;