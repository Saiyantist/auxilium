import type { Activity } from '@/types';
import { ScrollArea } from '../ui/scroll-area';

export default function TicketActivities({ activities }: { activities: any }) {
  if (activities.isLoading)
    return (
      <div className="flex items-center justify-center py-8 text-gray-500">
        Loading activities...
      </div>
    );

  if (!activities.data || activities.data.length === 0)
    return (
      <div className="flex items-center justify-center py-8 text-gray-500">
        No activities yet
      </div>
    );

  return (
    <ScrollArea className="h-[calc(100vh-11rem)]">
      <div className="space-y-3 pr-4">
        {activities.data?.map((a: Activity) => {
          const actionName = a.action
            .replace(/_/g, ' ')
            .split(' ')
            .map((word: string) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');

          const formatValue = (val: any) => {
            if (val === null || val === undefined) return '—';
            return String(val)
              .replace(/_/g, ' ')
              .split(' ')
              .map((word: string) => word.charAt(0).toUpperCase() + word.slice(1))
              .join(' ');
          };

          return (
            <div
              key={a.id}
              className="border rounded-lg p-4 bg-gradient-to-br from-purple-50 to-blue-50 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex-1">
                  <p className="font-semibold text-gray-800">{actionName}</p>
                  <p className="text-xs text-gray-600 mt-1">
                    by{' '}
                    <span className="font-medium">
                      {a.user?.first_name} {a.user?.last_name}
                    </span>
                  </p>
                </div>
                <p className="text-xs text-gray-500 ml-2 whitespace-nowrap">
                  {new Date(a.created_at).toLocaleString()}
                </p>
              </div>

              {a.metadata?.changes && Object.keys(a.metadata.changes).length > 0 && (
                <div className="mt-3 space-y-2">
                  {Object.entries(a.metadata.changes).map(
                    ([key, change]: [string, any]) => (
                      <div
                        key={key}
                        className="bg-white rounded p-2.5 text-sm border border-purple-100"
                      >
                        <div className="font-medium text-gray-700 mb-1">
                          {key
                            .replace(/_/g, ' ')
                            .split(' ')
                            .map(
                              (word: string) =>
                                word.charAt(0).toUpperCase() + word.slice(1),
                            )
                            .join(' ')}
                        </div>
                        <div className="flex items-center gap-2 text-gray-600">
                          <span className="inline-block bg-red-50 px-2 py-1 rounded text-xs border border-red-200">
                            {formatValue(change.old)}
                          </span>
                          <span className="text-gray-400">→</span>
                          <span className="inline-block bg-green-50 px-2 py-1 rounded text-xs border border-green-200">
                            {formatValue(change.new)}
                          </span>
                        </div>
                      </div>
                    ),
                  )}
                </div>
              )}

              {a.metadata?.subject && (
                <div className="mt-3 bg-white rounded p-2.5 text-sm border border-purple-100">
                  <p className="text-gray-700">
                    <span className="font-medium">Subject:</span> {a.metadata.subject}
                  </p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </ScrollArea>
  );
}
