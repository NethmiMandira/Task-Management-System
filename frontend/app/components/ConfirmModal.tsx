"use client";

interface ConfirmModalProps {
  isOpen: boolean;
  title?: string;
  message: string;
  confirmText?: string;
  variant?: "danger" | "success" | "primary";
  onConfirm: () => void;
  onCancel: () => void;
}

const ConfirmModal = ({
  isOpen,
  title = "Are you sure?",
  message,
  confirmText = "Confirm",
  variant = "primary",
  onConfirm,
  onCancel,
}: ConfirmModalProps) => {
  if (!isOpen) return null;

  const styles = {
    danger: {
      badge: "bg-rose-100 text-rose-600",
      button: "bg-rose-600 hover:bg-rose-700 shadow-rose-500/20",
    },
    success: {
      badge: "bg-emerald-100 text-emerald-600",
      button: "bg-emerald-600 hover:bg-emerald-700 shadow-emerald-500/20",
    },
    primary: {
      badge: "bg-indigo-100 text-indigo-600",
      button: "bg-indigo-600 hover:bg-indigo-700 shadow-indigo-500/20",
    },
  }[variant];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white/95 border border-slate-200/90 rounded-3xl p-6 max-w-sm w-full shadow-2xl space-y-5 animate-scaleUp">
        <div className="space-y-2 text-center">
          <div
            className={`w-12 h-12 rounded-2xl flex items-center justify-center mx-auto text-xl font-bold ${styles.badge}`}
          >
            !
          </div>

          <h3 className="text-lg font-bold text-slate-900">{title}</h3>
          <p className="text-xs text-slate-600 leading-relaxed">{message}</p>
        </div>

        <div className="flex items-center gap-3 pt-2">
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 py-2.5 rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-700 text-xs font-semibold transition-all cursor-pointer"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={onConfirm}
            className={`flex-1 py-2.5 rounded-xl text-white text-xs font-semibold shadow-md transition-all cursor-pointer ${styles.button}`}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;